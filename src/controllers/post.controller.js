const postModel = require("../models/post.model.js");
const genAi = require("../services/ai.service.js");
const uploadFile = require("../services/imageKit.service.js");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  const file = req.file;

  const fileextension = path.extname(file.originalname).toLowerCase();

  const uniqueFileName = `${uuidv4()}${fileextension}`;

  if (!file) return res.status(400).json({ message: "no file uploaded" });

  const caption = await genAi(file.buffer.toString("base64"));

  if (!caption)
    return res.status(400).json({ message: "error generating caption" });

  const { url } = await uploadFile(file.buffer, uniqueFileName);

  if (!url) return res.status(400).json({ message: "error uploading file" });

  const post = await postModel.create({
    image: url,
    caption,
    user: req.user._id,
  });

  res.status(201).json({ message: "Post caption created successfully", post });
}

async function getPostsController(req, res) {
  const posts = await postModel.find().populate("user", "name email");
  if (!posts || posts.length === 0) {
    return res.status(404).json({ message: "No posts found" });
  }

  res.status(200).json({ message: "Posts retrieved successfully", posts });
}

module.exports = {
  createPostController,
  getPostsController,
};
