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
 *  /api/tours:
 *    get:
 *      tags:
 *        - Tours
 *      summary: Получить все туры
 *      responses:
 *        200:
 *          description: Список туров
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Tour'
 *        500:
 *          description: Ошибка сервера
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
 *          description: Обьект тура
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Tour"
 *        500:
 *          description: Ошибка сервера
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
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                date:
 *                  type: string
 *                description:
 *                  type: string
 *                location:
 *                  type: string
 *                price:
 *                  type: number
 *                image:
 *                  type: string
 *      responses:
 *        201:
 *          description: Тур создан
 *        400:
 *          description: пустое тело запроса
 */
router.post("/", authMiddleware, createTour);

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
 *        - in: header
 *          name: Authorization
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                date:
 *                  type: string
 *                description:
 *                  type: string
 *                location:
 *                  type: string
 *                price:
 *                  type: number
 *                image:
 *                  type: string
 *      responses:
 *        200:
 *          description: тур обновлён
 *        400:
 *          description: не валидный id или пустой запрос
 *        401:
 *          description: тур не найден
 *        500:
 *          description: Ошибка сервера
 */
router.patch("/:id", authMiddleware, updateTour);

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
 *        - in: header
 *          name: Authorization
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: тур удалён
 *        400:
 *          description: невалидный id
 *        404:
 *          description: тур в базе не найден
 */
router.delete("/:id", authMiddleware, deleteTour);

export default router;
