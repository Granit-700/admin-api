import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getOneBlog,
  updateBlog,
} from "../controllers/blogController.js";

const router = Router();


router.get("/", getAllBlogs);

router.get("/:id", getOneBlog);

router.post("/", authMiddleware, createBlog);

router.patch("/:id", authMiddleware, updateBlog);

router.delete("/:id", authMiddleware, deleteBlog);

export default router;
