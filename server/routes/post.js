const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getMyPosts,
  toggleLike,
  addComment,
  deletePost,
  editPost,
  deleteComment,
  editComment,
} = require("../controllers/postController");

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Create a post
router.post("/posts/create", verifyToken, upload.single("image"), createPost);

// Get all posts
router.get("/posts", getAllPosts);

// Get logged-in user's posts
router.get("/mine", verifyToken, getMyPosts);

// Like/unlike a post
router.put("/posts/:postId/like", verifyToken, toggleLike);

// Add a comment
router.post("/posts/:postId/comment", verifyToken, addComment);

// Delete Post
router.delete("/posts/:postId", verifyToken, deletePost);
// Edit Post
router.put("/posts/:postId", verifyToken, editPost);

// Delete Comment
router.delete("/posts/:postId/comment/:commentId", verifyToken, deleteComment);

// Edit Comment
router.put("/posts/:postId/comment/:commentId", verifyToken, editComment);

module.exports = router;
