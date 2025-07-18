import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import swaggerJsdoc from "swagger-jsdoc";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dump } from "js-yaml";
import swaggerOptions from "./lib/swaggerConfig.cjs"; // Import Swagger config

try {
  // Generate Swagger Docs
  const specs = swaggerJsdoc(swaggerOptions);

  // ✅ Check if the generated JSON is valid
  if (!specs || Object.keys(specs).length === 0) {
    throw new Error("❌ Failed to generate Swagger JSON. Please check swaggerConfig.cjs");
  }

  // Convert JSON to YAML
  const yamlSpecs = dump(specs, { indent: 2, noRefs: true });

  // Ensure the `docs` directory exists
  const docsDir = join(__dirname, "docs");
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir);
  }

  // Write to `swagger.yaml`
  const filePath = join(docsDir, "swagger.yaml");
  writeFileSync(filePath, yamlSpecs, "utf8");

  console.log("✅ Swagger YAML file generated successfully at docs/swagger.yaml");
} catch (error) {
  console.error("❌ Error generating Swagger YAML:", error);
}
