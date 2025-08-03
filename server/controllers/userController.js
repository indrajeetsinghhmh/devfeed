const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Post");
const cloudinary = require("../middleware/cloudinaryConfig");
const bcrypt = require("bcryptjs");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, username, bio, skills, links } = req.body;

    // Optional: Check for duplicate username
    if (username) {
      const existingUser = await User.findOne({
        username,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const updatedFields = {
      name,
      username,
      bio,
      skills: skills ? JSON.parse(skills) : [],
      links: links ? JSON.parse(links) : [],
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedFields.avatar = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update profile", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { password } = req.body;

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    // Verify the password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Delete related posts (and comments will be deleted automatically)
    await Post.deleteMany({ createdBy: userId });

    // Delete comments made by the user on other posts
    await Post.updateMany(
      { comments: { $elemMatch: { commentedBy: userId } } }, // Find posts with comments by the user
      { $pull: { comments: { commentedBy: userId } } } // Remove those comments
    );

    // Finally, delete the user
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User  deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};
