import { Router } from "express";
import { login, updateUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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

router.post("/refresh", async (req, res) => {
  const { token, id } = req.body;
  const { refreshToken } = req.cookies;

  if (!token.trim() || !refreshToken.trim()) {
    return res.json({ message: "Invalid credentials" });
  }

  const user = await User.findById(id);

  if (user.refreshToken !== refreshToken) {
    res.json({ message: "Invalid credentials" });
  }

  const match = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const newToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  const newRefreshToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );

  res.json({ newToken });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
});

router.post("/logout", authMiddleware, async (req, res) => {
  const id = req.body.id;

  await User.findByIdAndUpdate(id, { refreshToken: null });

  res.json({ token: null });
  res.clearCookie();
});

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
