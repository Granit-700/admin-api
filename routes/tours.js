import { Router } from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getOneTour,
  updateTour,
} from "../controllers/tourController.js";
import { authMiddleware } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = Router();

/**
 * @swagger
 *  /api/tours:
 *    get:
 *      tags:
 *        - Tours
 *      summary: Получить все туры
 *      responses:
 *        200:
 *          description: Get all tours
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Tour"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.get("/", getAllTours);

/**
 * @swagger
 *  /api/tours/{id}:
 *    get:
 *      tags:
 *        - Tours
 *      summary: Получить один тур
 *      description: Возвращает один тур по id
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID тура
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Get tour
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Tour"
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        404:
 *          $ref: "#/components/responses/NotFound"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.get("/:id", getOneTour);

/**
 * @swagger
 *  /api/tours:
 *    post:
 *      tags:
 *        - Tours
 *      security:
 *        - bearerAuth: []
 *      summary: Создать тур
 *      description: создаёт один тур по переданным данным из тела запроса
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: "#/components/schemas/TourContent"
 *      responses:
 *        201:
 *          description: Tour created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Tour"
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "itineraryImages", maxCount: 20 },
  ]),
  createTour,
);

/**
 * @swagger
 *  /api/tours/{id}:
 *    patch:
 *      tags:
 *        - Tours
 *      security:
 *        - bearerAuth: []
 *      summary: Обновить тур
 *      description: Обновляет переданные в поля у тура
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID тура
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: "#/components/schemas/TourContent"
 *      responses:
 *        200:
 *          description: Tour updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Tour"
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        404:
 *          $ref: "#/components/responses/NotFound"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.patch(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "itineraryImages", maxCount: 20 },
  ]),
  updateTour,
);

/**
 * @swagger
 *  /api/tours/{id}:
 *    delete:
 *      tags:
 *        - Tours
 *      security:
 *        - bearerAuth: []
 *      summary: Удалить тур
 *      description: Удаляет тур из базы и возвращает его в теле ответа
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID тура
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Tour deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Tour"
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        404:
 *          $ref: "#/components/responses/NotFound"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.delete("/:id", authMiddleware, deleteTour);

export default router;
