import mongoose from "mongoose";
import Tour from "../models/Tour.js";

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.json(tours);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  };
};

export const getOneTour = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "not valid id" });
  };

  try {
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ message: "not found" });
    };

    res.json(tour);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  };
};

export const createTour = async (req, res) => {
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "empty request" });
  };

  try {
    const createdTour = await Tour.create(body);

    res.status(201).json(createdTour)
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  };
};

export const updateTour = async (req, res) => {
  const id = req.params.id;
  const { title, description, location, price, date, image } = req.body;
  const body = { title, description, location, price, date, image };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "not valid id" });
  };

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "empty request" });
  };

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { ...body, },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedTour) {
      return res.status(404).json({ message: "not found" });
    };

    res.json(updatedTour);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  };
};

export const deleteTour = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "not valid id" });
  };

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ message: "not found" });
    };

    res.json(deletedTour);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  };
};
