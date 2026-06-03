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
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    itinerary: {
      type: [
        {
          day: Number,
          title: String,
          text: String,
          accommodation: String,
          meals: String,
          image: {
            url: String,
            public_id: String,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
