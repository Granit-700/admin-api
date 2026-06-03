import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.json(blogs);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const getOneBlog = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "not valid id" });
  }

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "not found" });
    }

    res.json(blog);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const createBlog = async (req, res) => {
  try {
    const body = req.body;
    const mainImage = req.files?.image?.[0];

    if (Object.keys(body).length === 0 && !req.files?.image) {
      return res.status(400).json({ message: "empty request" });
    }

    let image = null;

    if (mainImage) {
      try {
        const result = await cloudinary.uploader.upload(mainImage.path, {
          folder: "blogs",
          quality: "auto",
          fetch_format: "auto",
        });

        image = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      } finally {
        if (fs.existsSync(mainImage.path)) fs.unlinkSync(mainImage.path);
      }
    }

    const createdBlog = await Blog.create({
      ...body,
      image,
    });

    res.status(201).json(createdBlog);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ message: "slug already exists" });
    }
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not valid id" });
    }

    if (Object.keys(req.body || {}).length === 0 && !req.files?.image.length) {
      return res.status(400).json({ message: "empty request" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "not found" });
    }

    const mainImageFile = req.files?.image?.[0];
    let newMainImage = null;

    if (mainImageFile) {
      try {
        const result = await cloudinary.uploader.upload(mainImageFile.path, {
          folder: "blogs",
          quality: "auto",
          fetch_format: "auto",
        });
        newMainImage = { url: result.secure_url, public_id: result.public_id };
      } finally {
        if (fs.existsSync(mainImageFile.path)) {
          fs.unlinkSync(mainImageFile.path);
        }
      }
    }

    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.content !== undefined) updates.content = req.body.content;
    if (req.body.excerpt !== undefined) updates.excerpt = req.body.excerpt;
    if (req.body.slug !== undefined) updates.slug = req.body.slug;
    if (req.body.author !== undefined) updates.author = req.body.author;
    if (req.body.status !== undefined) updates.status = req.body.status;
    if (req.body.categories !== undefined)
      updates.categories = req.body.categories;
    if (req.body.tags !== undefined) updates.tags = req.body.tags;

    if (newMainImage) updates.image = newMainImage;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
      runValidators: true,
    });

    let toDelete = null;

    if (newMainImage && blog.image?.public_id) {
      toDelete = blog.image.public_id;
    }

    if (toDelete) {
      Promise.all(cloudinary.uploader.destroy(toDelete)).catch((err) =>
        console.error("Cloudinary cleanup error:", err),
      );
    }

    res.json(updatedBlog);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ message: "slug already exists" });
    }
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "not valid id" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "not found" });
    }

    await blog.deleteOne();

    let toDelete = null;

    if (blog.image?.public_id) {
      toDelete = blog.image.public_id;
    }

    if (toDelete) {
      cloudinary.uploader
        .destroy(toDelete)
        .catch((err) => console.error("Cloudinary cleanup error:", err));
    }

    res.json(blog);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};
