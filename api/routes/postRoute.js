const express = require("express");
const { createPostController, updatePostController, deletePostController, getPostController, getAllPostsController } = require("../controllers/postController");
const router = express.Router();

// Create post
router.post("/create-post", createPostController);

// Update Post
router.put("/update-post/:id", updatePostController)

// Delete post
router.delete("/delete-post/:id", deletePostController)

// Get post 
router.get("/get-post/:id", getPostController)

// Get all posts
router.get("/all-posts", getAllPostsController)

module.exports = router;