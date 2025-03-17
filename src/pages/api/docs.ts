import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "../../../lib/swaggerConfig.cjs";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  res.status(200).json(swaggerSpec);
}
