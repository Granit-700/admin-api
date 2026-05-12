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

/**
 * @swagger
 *  /api/blogs:
 *    get:
 *      tags:
 *        - Blogs
 *      summary: Получить все блоги
 *      responses:
 *        200:
 *          description: Get all blogs
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Blog"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.get("/", getAllBlogs);

/**
 * @swagger
 *  /api/blogs/{id}:
 *    get:
 *      tags:
 *        - Blogs
 *      summary: Получить один блог
 *      description: Возвращает один блог по id
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID блога
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Get blog
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Blog"
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        404:
 *          $ref: "#/components/responses/NotFound"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.get("/:id", getOneBlog);

/**
 * @swagger
 *  /api/blogs:
 *    post:
 *      tags:
 *        - Blogs
 *      security:
 *        - bearerAuth: []
 *      summary: Создать блог
 *      description: создаёт один блог по переданным данным из тела запроса
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BlogContent"
 *      responses:
 *        201:
 *          description: Blog created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Blog"
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.post("/", authMiddleware, createBlog);

/**
 * @swagger
 *  /api/blogs/{id}:
 *    patch:
 *      tags:
 *        - Blogs
 *      security:
 *        - bearerAuth: []
 *      summary: Обновить блог
 *      description: Обновляет переданные в поля у блога
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID блога
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BlogContent"
 *      responses:
 *        200:
 *          description: Blog updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Blog"
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        404:
 *          $ref: "#/components/responses/NotFound"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.patch("/:id", authMiddleware, updateBlog);

/**
 * @swagger
 *  /api/blogs/{id}:
 *    delete:
 *      tags:
 *        - Blogs
 *      security:
 *        - bearerAuth: []
 *      summary: Удалить блог
 *      description: Удаляет блог из базы и возвращает его в теле ответа
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID блога
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Blog deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Blog"
 *        400:
 *          $ref: "#/components/responses/BadReq"
 *        404:
 *          $ref: "#/components/responses/NotFound"
 *        500:
 *          $ref: "#/components/responses/ServerError"
 */
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
