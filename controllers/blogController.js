import mongoose from "mongoose";
import Blog from "../models/Blog.js";

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
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "empty request" });
  }

  try {
    const createdBlog = await Blog.create(body);

    res.status(201).json(createdBlog);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const updateBlog = async (req, res) => {
  const id = req.params.id;
  const {
    title,
    content,
    excerpt,
    slug,
    author,
    status,
    categories,
    tags,
    image,
  } = req.body;
  const body = {
    title,
    content,
    excerpt,
    slug,
    author,
    status,
    categories,
    tags,
    image,
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "not valid id" });
  }

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "empty request" });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...body },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "not found" });
    }

    res.json(updatedBlog);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "not valid id" });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deleteBlog) {
      return res.status(404).json({ message: "not found" });
    }

    res.json(deletedBlog);
  } catch (e) {
    console.error(e.message || e);
    res.status(500).json({ message: e.message || e });
  }
};
