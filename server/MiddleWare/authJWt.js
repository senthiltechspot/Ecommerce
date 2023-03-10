const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
const authJWT = {
  isAuthenticated: isAuthenticated
}
module.exports = authJWT;
