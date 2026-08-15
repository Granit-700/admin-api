import { Router } from "express";
import {
  login,
  logout,
  refresh,
  updateUser,
} from "../controllers/authController.js";
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
 *          description: Возвращает JWT токен в тело ответа. Автоматически устанавливает Refresh токен в куки браузера
 *          headers:
 *            Set-Cookie:
 *              description: Вставляет Refresh-Токен в куки
 *              schema:
 *                type: string
 *                example: refreshToken=eyJhbGciOi...; HttpOnly; Path=/;
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
 *  /api/auth/refresh:
 *    post:
 *      tags:
 *        - Auth
 *      summary: Обновить токены
 *      description: получает Refresh токен из куков браузера и отправляет новый access в теле ответа и обновляет Refresh токен в куках
 *      parameters:
 *        - name: refreshToken
 *          in: cookie
 *          schema:
 *            type: string
 *            example: refreshToken=eyJhbGciOi...;
 *      responses:
 *        200:
 *          description: Возвращает JWT токен в теле ответа. Автоматически устанавливает Refresh токен в куки браузера
 *          headers:
 *            Set-Cookie:
 *              description: Вставляет Refresh-Токен в куки
 *              schema:
 *                type: string
 *                example: refreshToken=eyJhbGciOi...; HttpOnly;
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: refreshToken=eyJhbGciOi...;
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        401:
 *          $ref: "#/components/responses/Unauthorized"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.post("/refresh", refresh);

/**
 * @swagger
 *  /api/auth/logout:
 *    post:
 *      tags:
 *        - Auth
 *      security:
 *        - bearerAuth: []
 *      summary: выход из аккаунта
 *      description: обнуляет Refresh токен на сервере и в куках браузера. так же обнуляет Access токен в брузере.
 *      parameters:
 *        - name: refreshToken
 *          in: cookie
 *          schema:
 *            type: string
 *            example: refreshToken=eyJhbGciOi...;
 *      responses:
 *        200:
 *          description: стирает токен при перезаписи
 *          headers:
 *            Set-Cookie:
 *              description: стирает Refresh-токен в куках
 *              schema:
 *                type: string
 *                example: refreshToken=null; HttpOnly;
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: null
 *                    example: null
 *        401:
 *          $ref: "#/components/responses/Unauthorized"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.post("/logout", authMiddleware, logout);

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
