import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { code, name, avgAirHumidity, avgGroundHumidity, avgTemperature } = req.body;
      console.log("name", name);
      const newPlant = await prisma.plant
        .create({
          data: {
            code,
            name,
            avgAirHumidity,
            avgGroundHumidity,
            avgTemperature,
            timestamp: new Date(),
          },
        })
        .catch((error) => console.log(error));
      res.status(201).json(newPlant);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
