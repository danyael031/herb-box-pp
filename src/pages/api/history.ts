import { NextApiRequest, NextApiResponse } from "next";
import { Action } from "@prisma/client";
import { prisma } from "@/utils/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const plant1History_promise = prisma.history.findMany({where: {plantId: 1}, take: 20, orderBy : {timestamp: 'desc'} });
      const plant2History_promise = prisma.history.findMany({where: {plantId: 2}, take: 20, orderBy : {timestamp: 'desc'} });

      const responses = await Promise.all([plant1History_promise, plant2History_promise])
      const history = {
        plant1History: responses[0],
        plant2History: responses[1]
      }

      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } 
  
  if (req.method === "POST") {
    const { plantId, airHumidity, groundHumidity, temperature } = req.body;
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
