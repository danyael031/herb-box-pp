/** @type {import("swagger-jsdoc").Options} */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Herb Box API",
      version: "1.0.0",
      description: "API for managing plants and irrigation system",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local Development Server",
      },
    ],
    components: {
      schemas: {
        Plant: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            code: { type: "string", example: "LEFT" },
            name: { type: "string", example: "Mint Mentha" },
            humidity: { type: "integer", example: 470 },
            pin: { type: "string", example: "A1" },
            interval: { type: "integer", example: 300000 },
            irrigate: { type: "string", example: "off" },
            pump: { type: "string", example: "LEFT" },
            chartColor: { type: "string", example: "#3498DB" },
            heartbeat: { type: "string", format: "date-time", example: "2024-02-10T09:15:12Z" },
          },
        },
      },
    },
    paths: {
      "/plants/get": {
        get: {
          summary: "Get all plants",
          description: "Returns a list of all plants with their data.",
          responses: {
            200: {
              description: "A list of plants",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Plant" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./pages/api/**/*.ts"], // Ensure this is correctly set
};

module.exports = swaggerOptions;
