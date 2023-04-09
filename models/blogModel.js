const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  text: String,
  author: String,
  categories: [String],
  createdAt: Date,
  objectId: String,
});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
