import mongoose from "mongoose";
import Tour from "../models/Tour.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.json(tours);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const getOneTour = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not valid id" });
    }

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ message: "not found" });
    }

    res.json(tour);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const createTour = async (req, res) => {
  try {
    const body = req.body;
    const mainImage = req.files?.image?.[0];
    const itineraryFiles = req.files?.itineraryImages || [];

    if (
      Object.keys(body).length === 0 &&
      !req.files?.image &&
      itineraryFiles.length === 0
    ) {
      return res.status(400).json({ message: "empty request" });
    }

    let itinerary = [];
    if (req.body.itinerary) {
      try {
        itinerary = JSON.parse(req.body.itinerary);
      } catch {
        return res.status(400).json({ message: "invalid itinerary JSON" });
      }
    }

    let image = null;

    if (mainImage) {
      try {
        const result = await cloudinary.uploader.upload(mainImage.path, {
          folder: "tours",
          quality: "auto",
          fetch_format: "auto",
        });

        image = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      } finally {
        if (fs.existsSync(mainImage.path)) fs.unlinkSync(mainImage.path);
      }
    }

    const uploadedItineraryImages = await Promise.all(
      itineraryFiles.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "itinerary",
            quality: "auto",
            fetch_format: "auto",
          });

          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        } finally {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        }
      }),
    );

    const formattedItinerary = itinerary.map((day, i) => ({
      ...day,
      image: uploadedItineraryImages[i] || null,
    }));

    const createdTour = await Tour.create({
      ...body,
      image,
      itinerary: formattedItinerary,
    });

    res.status(201).json(createdTour);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const updateTour = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not valid id" });
    }

    if (
      Object.keys(req.body || {}).length === 0 &&
      !req.files?.image?.length &&
      !req.files?.itineraryImages?.length
    ) {
      return res.status(400).json({ message: "empty request" });
    }

    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ message: "not found" });
    }

    const mainImageFile = req.files?.image?.[0];
    let newMainImage = null;

    if (mainImageFile) {
      try {
        const result = await cloudinary.uploader.upload(mainImageFile.path, {
          folder: "tours",
          quality: "auto",
          fetch_format: "auto",
        });
        newMainImage = { url: result.secure_url, public_id: result.public_id };
      } finally {
        if (fs.existsSync(mainImageFile.path)) {
          fs.unlinkSync(mainImageFile.path);
        }
      }
    }

    const itineraryFiles = req.files?.itineraryImages || [];
    const uploadedItineraryImages = await Promise.all(
      itineraryFiles.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "itinerary",
            quality: "auto",
            fetch_format: "auto",
          });
          return { url: result.secure_url, public_id: result.public_id };
        } finally {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        }
      }),
    );

    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined)
      updates.description = req.body.description;
    if (req.body.location !== undefined) updates.location = req.body.location;
    if (req.body.date !== undefined) updates.date = req.body.date;
    if (req.body.price !== undefined) updates.price = req.body.price;

    if (newMainImage) updates.image = newMainImage;

    if (req.body.itinerary !== undefined) {
      let parsedItinerary;
      try {
        parsedItinerary = JSON.parse(req.body.itinerary);
        if (!Array.isArray(parsedItinerary)) {
          return res
            .status(400)
            .json({ message: "itinerary must be an array" });
        }
      } catch {
        return res.status(400).json({ message: "invalid itinerary JSON" });
      }

      updates.itinerary = parsedItinerary.map((day, i) => ({
        ...day,
        image: uploadedItineraryImages[i] ?? tour.itinerary[i]?.image ?? null,
      }));
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
      runValidators: true,
    });

    const toDelete = [];

    if (newMainImage && tour.image?.public_id) {
      toDelete.push(tour.image.public_id);
    }

    if (req.body.itinerary !== undefined) {
      tour.itinerary
        .map((day) => day.image?.public_id)
        .filter(Boolean)
        .forEach((id) => toDelete.push(id));
    }

    if (toDelete.length > 0) {
      Promise.all(
        toDelete.map((pid) => cloudinary.uploader.destroy(pid)),
      ).catch((err) => console.error("Cloudinary cleanup error:", err));
    }

    res.json(updatedTour);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not valid id" });
    }

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ message: "not found" });
    }

    await tour.deleteOne();

    const toDelete = [];

    if (tour.image?.public_id) {
      toDelete.push(tour.image.public_id);
    }

    tour.itinerary
      .map((day) => day.image?.public_id)
      .filter(Boolean)
      .forEach((pid) => toDelete.push(pid));

    if (toDelete.length > 0) {
      Promise.all(
        toDelete.map((pid) => cloudinary.uploader.destroy(pid)),
      ).catch((err) => console.error("Cloudinary cleanup error:", err));
    }

    res.json(tour);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};
