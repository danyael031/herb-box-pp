import { PrismaClient, Action } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { plantId, airHumidity, groundHumidity, temperature } = req.body;
    console.log("req", { req: req.body, res });
    try {
      const observedPlant = await prisma.plant.findUnique({ where: { id: plantId } });
      if (!observedPlant) {
        return res.status(404).json({ error: "Plant not found" });
      }

      const { avgAirHumidity, avgGroundHumidity, avgTemperature } = observedPlant;

      const paramenterComparation = [
        airHumidity < avgAirHumidity,
        groundHumidity < avgGroundHumidity,
        temperature < avgTemperature,
      ].filter((param) => param).length;

      const needsAction = paramenterComparation >= 2 ? Action.IRRIGATE : Action.NONE;

      const newEntry = await prisma.history.create({
        data: {
          plantId,
          airHumidity,
          groundHumidity,
          temperature,
          requiredAction: needsAction,
        },
      });
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
