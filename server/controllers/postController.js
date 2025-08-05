const Post = require("../models/Post");
const cloudinary = require("../middleware/cloudinaryConfig");

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // Get the secure URL of the uploaded image
    }

    const post = new Post({
      title,
      content,
      tags: tags ? JSON.parse(tags) : [],
      image: imageUrl,
      createdBy: req.user.userId,
    });

    await post.save();
  this.deletePost();
    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    console.error("Post creation failed:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("createdBy", "name avatar username")
      .populate("comments.commentedBy", "name avatar username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: err.message });
  }
};

// Get My Posts
exports.getMyPosts = async (req, res) => {
  try {
    const userId = req.user.userId;

    const posts = await Post.find({ createdBy: userId })
      .populate("createdBy", "name avatar username")
      .populate("comments.commentedBy", "name avatar username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching your posts", error: err.message });
  }
};

// Toggle Like
exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      message: isLiked ? "Unliked" : "Liked",
      likes: post.likes.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to toggle like", error: error.message });
  }
};

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user.userId;

    if (!text)
      return res.status(400).json({ message: "Comment cannot be empty" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = { text, commentedBy: userId };
    post.comments.push(newComment);
    await post.save();

    const updatedPost = await Post.findById(postId).populate(
      "comments.commentedBy",
      "name avatar username"
    );

    res
      .status(201)
      .json({ message: "Comment added", comments: updatedPost.comments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to comment", error: error.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Use findByIdAndDelete instead of remove
    await Post.findByIdAndDelete(postId);

    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Failed to delete post:", error);
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
};

// Edit Post
exports.editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;
    const { title, content, tags } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags ? JSON.parse(tags) : post.tags;

    await post.save();
    res.json({ message: "Post updated", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update post", error: error.message });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.commentedBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
    await post.save();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: error.message });
  }
};

// Edit Comment
exports.editComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.userId;
    const { text } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.commentedBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = text || comment.text;
    await post.save();
    res.json({ message: "Comment updated", comment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update comment", error: error.message });
  }
};
