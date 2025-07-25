import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../../../lib/swaggerConfig.cjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  if (req.query.format === "json") {
    return res.status(200).json(swaggerSpec);
  }

  const html = swaggerUi.generateHTML(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Herb Box API Documentation",
  });

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
