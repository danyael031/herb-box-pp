import { NextApiRequest, NextApiResponse } from "next";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import path from "path";
import fs from "fs";

const swaggerFilePath = path.join(process.cwd(), "swagger.yaml");

let swaggerDocument;
try {
  if (!fs.existsSync(swaggerFilePath)) {
    throw new Error("Swagger definition file not found. Run 'node generate-swagger.js' first.");
  }

  const fileContent = fs.readFileSync(swaggerFilePath, "utf8");
  swaggerDocument = yaml.load(fileContent);
} catch (error) {
  console.error("❌ Error loading Swagger YAML:", error);
  swaggerDocument = {}; // Fallback to an empty object to prevent crashes
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.send(swaggerUi.setup(swaggerDocument));
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
