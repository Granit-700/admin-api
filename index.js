import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import toursRouter from "./routes/tours.js";
import authRouter from "./routes/auth.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import blogsRouter from "./routes/blogs.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tours", toursRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

const main = async () => {
  try {
    await mongoose.connect(DB_URI, {
      dbname: "tour-app",
    });
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`server starting on PORT:${PORT}`);
    });
  } catch (e) {
    console.error(e.message || e);
  }
};

main();
