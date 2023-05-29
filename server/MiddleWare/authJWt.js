const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
const isAuthenticated = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ message: "No Token Provided" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken.id);
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
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ message: "No Token Provided" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    if (user.userTypes !== "ADMIN" && user.userStatus !== "APPROVED") {
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
