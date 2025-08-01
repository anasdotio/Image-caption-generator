const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes.js");
const postRoutes = require("./routes/post.routes.js");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
