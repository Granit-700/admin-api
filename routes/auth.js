import { Router } from "express";
import { login, updateUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

/**
 * @swagger
 *  /api/auth/login:
 *    post:
 *      tags:
 *        - Auth:
 *      summary: Получение JWT токена
 *      description: Принимает обьект с credentials и потом возвращает JWT токен со сроком жизни в 1 день
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: 
 *                - login
 *                - password
 *              properties:
 *                login:
 *                  type: string
 *                  example: admin
 *                password:
 *                  type: string
 *                  format: password
 *                  example: password
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
 *          description: Нужные поля не заполнены
 *        401:
 *          description: Данные не правильные
 *        500: 
 *          description: Ошибка сервера
 */
router.post("/login", login);

router.patch("/me", authMiddleware, updateUser);

export default router;
