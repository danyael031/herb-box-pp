import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import initMiddleware from "../../../../lib/init-middleware";
const prisma = new PrismaClient();

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
    origin: "*",
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  if (req.method === "POST") {
    const { code, name, avgAirHumidity, avgGroundHumidity, avgTemperature, timestamp } = req.body;

    try {
      const newPlant = await prisma.plant.create({
        data: {
          code,
          name,
          avgAirHumidity,
          avgGroundHumidity,
          avgTemperature,
          timestamp: new Date(timestamp),
        },
      });
      res.status(201).json(newPlant);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
