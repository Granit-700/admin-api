import { Router } from "express";
import { login, updateUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

/**
 * @swagger
 *  /api/auth/login:
 *    post:
 *      tags:
 *        - Auth
 *      summary: Получение JWT токена
 *      description: Принимает данные пользователя и возвращает JWT токен со сроком в жизни 1 день
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Username"
 *      responses:
 *        200:
 *          description: Возвращает JWT токен
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        401:
 *          $ref: "#/components/responses/Unauthorized"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.post("/login", login);

/**
 * @swagger
 *  /api/auth/me:
 *    patch:
 *      tags:
 *        - Auth
 *      security:
 *        - bearerAuth: []
 *      summary: Обновить данные пользователя
 *      description: Обновляет только переданные данные пользователя
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserUpdate"
 *      responses:
 *        200:
 *          description: User credentials updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/UserUpdated"
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        401:
 *          $ref: "#/components/responses/Unauthorized"
 *        404:
 *          $ref: "#/components/responses/NotFound"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.patch("/me", authMiddleware, updateUser);

export default router;
