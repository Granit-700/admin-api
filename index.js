import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import toursRouter from "./routes/tours.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tours", toursRouter);

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

const main = async () => {
  try {
    await mongoose.connect(DB_URI, {
      dbname: "tour-app"
    });
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`server starting on: http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e.message || e);
  };
};

main();
