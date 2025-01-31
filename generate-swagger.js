const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml"); // ✅ Use `js-yaml` instead of `yamljs`
const swaggerOptions = require("./lib/swaggerConfig.cjs"); // Import Swagger config

try {
  // Generate Swagger Docs
  const specs = swaggerJsdoc(swaggerOptions);

  // ✅ Check if the generated JSON is valid
  if (!specs || Object.keys(specs).length === 0) {
    throw new Error("❌ Failed to generate Swagger JSON. Please check swaggerConfig.cjs");
  }

  // Convert JSON to YAML
  const yamlSpecs = yaml.dump(specs, { indent: 2, noRefs: true });

  // Ensure the `docs` directory exists
  const docsDir = path.join(__dirname, "docs");
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
  }

  // Write to `swagger.yaml`
  const filePath = path.join(docsDir, "swagger.yaml");
  fs.writeFileSync(filePath, yamlSpecs, "utf8");

  console.log("✅ Swagger YAML file generated successfully at docs/swagger.yaml");
} catch (error) {
  console.error("❌ Error generating Swagger YAML:", error);
}
