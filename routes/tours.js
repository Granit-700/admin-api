import { Router } from "express";
import { createTour, deleteTour, getAllTours, getOneTour, updateTour } from "../controllers/tourController.js";

const router = Router();

router.get("/", getAllTours);

router.get("/:id", getOneTour);

router.post("/", createTour);

router.patch("/:id", updateTour);

router.delete("/:id", deleteTour);

export default router;
