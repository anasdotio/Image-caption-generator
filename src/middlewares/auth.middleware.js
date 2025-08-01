const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
async function auth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decode.id)
      .select("-password -createdAt -updatedAt");

    req.user = user;

    req.user = decode?.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = auth;
