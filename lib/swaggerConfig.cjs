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
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
      schemas: {
        Plant: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            code: { type: "string", example: "LEFT" },
            name: { type: "string", example: "Mint Mentha" },
            avgAirHumidity: { type: "integer", example: 470 },
            avgGroundHumidity: { type: "integer", example: 470 },
            avgTemperature: { type: "integer", example: 470 },
            timestamp: { type: "string", format: "date-time", example: "2024-02-10T09:15:12Z" },
          },
        },
        History: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            plantId: { type: "integer", example: 1 },
            airHumidity: { type: "integer", example: 470 },
            groundHumidity: { type: "integer", example: 470 },
            temperature: { type: "integer", example: 470 },
            timestamp: { type: "string", format: "date-time", example: "2024-02-10T09:15:12Z" },
            requiredAction: { type: "string", enum: ["NONE", "IRRIGATE"], example: "NONE" },
            Plant: {
              $ref: "#/components/schemas/Plant",
            },
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [],
        ApiKeyAuth: [],
      },
    ],
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
      "/plants/post": {
        post: {
          summary: "Add a new plant",
          description: "Creates a new plant entry in the database.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Plant" },
              },
            },
          },
          responses: {
            201: {
              description: "Plant added successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Plant" },
                },
              },
            },
            500: {
              description: "Server error",
            },
          },
        },
      },
      "/history/get": {
        get: {
          summary: "Get all entries",
          description: "Returns a list of the history from the monitoring devices",
          responses: {
            200: {
              description: "Monitoring history",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/History" },
                  },
                },
              },
            },
          },
        },
      },
      "/history/post": {
        post: {
          summary: "Add new monitoring entry",
          description: "Creates a new moniroting entry in the database.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/History" },
              },
            },
          },
          responses: {
            201: {
              description: "Entry added successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/History" },
                },
              },
            },
            500: {
              description: "Server error",
            },
          },
        },
      },
    },
  },
  apis: ["./pages/api/**/*.ts"],
};

module.exports = swaggerOptions;
