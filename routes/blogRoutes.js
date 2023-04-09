const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new blog post
router.post('/', async (req, res) => {
  const newBlog = new Blog(req.body);

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.json(deletedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all blog posts
router.delete('/', async (req, res) => {
  try {
    const deletedBlogs = await Blog.deleteMany();
    res.json(deletedBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
