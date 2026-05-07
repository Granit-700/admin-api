import { Router } from "express";
import { login, updateUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);

router.patch("/me", authMiddleware, updateUser);

export default router;
