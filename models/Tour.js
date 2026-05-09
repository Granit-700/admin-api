import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String, // URL
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
