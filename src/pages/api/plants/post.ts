import { PrismaClient } from "@prisma/client/extension";
import { NextApiRequest, NextApiResponse,  } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { code, name, humidity, pin, interval, irrigate, pump, chartColor, heartbeat, actions } =
      req.body;

    try {
      const newPlant = await prisma.plant.create({
        data: {
          code,
          name,
          humidity,
          pin,
          interval,
          irrigate,
          pump,
          chartColor,
          heartbeat: new Date(heartbeat),
          actions: {
            create: actions.map((action) => ({
              action: action.action,
              label: action.label,
            })),
          },
        },
      });

      res.status(201).json(newPlant);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
