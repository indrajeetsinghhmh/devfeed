const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { updateProfile, deleteUser } = require("../controllers/userController");

// 🔐 Secure with verifyToken middleware
router.put("/user", verifyToken, upload.single("avatar"), updateProfile);
router.delete("/user", verifyToken, deleteUser);

module.exports = router;
