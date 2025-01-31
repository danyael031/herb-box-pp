import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Error from "next/error";

const prisma = new PrismaClient();

/** 
 * @swagger
 * 
*/



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const plants = await prisma.plant.findMany({ include: { actions: true } });
      res.status(200).json(plants);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
