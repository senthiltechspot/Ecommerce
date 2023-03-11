const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
const isAuthenticated = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken.user._id);
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

const isAuthenticatedAdmin = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken.user._id);
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    if (!user.isAdmin) {
      return res.status(403).send({ message: "Forbidden" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
const authJWT = {
  isAuthenticated,
  isAuthenticatedAdmin,
};
module.exports = authJWT;
