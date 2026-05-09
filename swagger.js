import swaggerJsdoc from "swagger-jsdoc";

export default swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Admin-API", version: "1.0.0" },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/auth.js", "./routes/tours.js"],
});
