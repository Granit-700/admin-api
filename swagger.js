import swaggerJsdoc from "swagger-jsdoc";

export default swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin-API",
      version: "1.0.0",
      description: "Документация к API",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./swagger/*.js"],
});
