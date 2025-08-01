const postModel = require("../models/post.model.js");
const genAi = require("../services/ai.service.js");
const uploadFile = require("../services/imageKit.service.js");

async function createPostController(req, res) {
  const file = req.file;

  if (!file) return res.status(400).json({ message: "no file uploaded" });

  const caption = await genAi(file.buffer.toString("base64"));

  if (!caption)
    return res.status(400).json({ message: "error generating caption" });
  
  const { url } = await uploadFile(file.buffer, file.originalname);

  if (!url) return res.status(400).json({ message: "error uploading file" });

  const post = await postModel.create({
    image: url,
    caption,
    user: req.user._id,
  });

  res.status(201).json({ message: "Post caption created successfully", post });
}

module.exports = {
  createPostController,
};
