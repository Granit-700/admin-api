import { Router } from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getOneTour,
  updateTour,
} from "../controllers/tourController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Получить все туры
 *     responses:
 *       200:
 *         description: Список туров
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", getAllTours);

router.get("/:id", getOneTour);

router.post("/", authMiddleware, createTour);

router.patch("/:id", authMiddleware, updateTour);

router.delete("/:id", authMiddleware, deleteTour);

export default router;
