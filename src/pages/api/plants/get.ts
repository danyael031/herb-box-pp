import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
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
  if (req.method === "GET") {
    try {
      const plants = await prisma.plant.findMany();
      res.status(200).json(plants);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
