const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  platform: { type: String }, // e.g., "GitHub"
  url: { type: String}, // e.g., "https://github.com/..."
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // ensure unique usernames
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  links: {
    type: [linkSchema], // dynamic list of links
    default: [],
  },
  avatar: {
    type: String, // URL to uploaded avatar or generated default
    default: "", // you can fill this on user creation logic
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
