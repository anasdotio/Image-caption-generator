const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const auth = require("../middlewares/auth.middleware.js");
const {
  createPostController,
  getPostsController,
} = require("../controllers/post.controller.js");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", auth, upload.single("image"), createPostController);
router.get("/", auth, getPostsController);

module.exports = router;
