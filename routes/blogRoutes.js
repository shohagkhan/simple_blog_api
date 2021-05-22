const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");
const Author = require("../models/authorModel");

// Create Blog
router.post("/blogs", async function (req, res) {
  const { title, description, authorId } = req.body;
  const blog = await Blog.create({ title, description, author: authorId });
  // Update author relational field
  const author = await Author.findById(authorId);
  author.blogs.push(blog._id);
  await author.save();

  res.send(blog);
});

// Read All Blog
router.get("/blogs", async function (req, res) {
  const blog = await Blog.find({}).populate("author", "-blogs");
  res.send(blog);
});

// Read Single Blog
router.get("/blogs/:id", async function (req, res) {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author", "-blogs");
  res.json(blog);
});

// Update Blog
router.put("/blogs/:id", async function (req, res) {
  const { id } = req.params;
  const { title, description } = req.body;
  const blog = await Blog.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );
  res.json(blog);
});
// Delete Blog
router.delete("/blogs/:id", async function (req, res) {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  res.send("Blog Deleted");
});

// ......... Confusion About Sub/Nested Document........

// Create Subdocuments

router.post("/blogs/:blogId/comments", async function (req, res) {
  const blogId = req.params.blogId;
  const { commentText } = req.body;

  const blog = await Blog.findById(blogId);
  blog.comments.push({ commentText });
  const newBlog = await blog.save();

  res.json(newBlog);
});

// Get Specific comment

// Update Subdocuments

router.put("/blogs/:blogId/comments/:commentId", async function (req, res) {
  const { blogId, commentId } = req.params;
  const blog = await Blog.findById(blogId);
  blog.comments.id(commentId).commentText = req.body.commentText;
  const newBlog = await blog.save();

  res.json(newBlog);
});

// Delete Subdocuments

router.delete("/blogs/:blogId/comments/:commentId", async function (req, res) {
  const { blogId, commentId } = req.params;
  const blog = await Blog.findById(blogId);
  blog.comments.id(commentId).remove();
  const newBlog = await blog.save();

  res.json(newBlog);
});

module.exports = router;
