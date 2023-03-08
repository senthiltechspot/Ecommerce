const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

exports.register = async (req, res) => {
  let { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    // Save user in the database
    const saveddata = await user.save();
    res.send({ message: "User Created Successfully", saveddata });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: "UserName or Password cannot be empty" });
  }
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).send({ message: "user not found" });
  }

  try {
    const match = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
      expiresIn: "10d",
    });

    if (match) {
      res.cookie("token", token, { httpOnly: true });

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
exports.logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken")
      .status(200)
      .send({ message: "Successfully logged out" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  return;
};
exports.protected = async (req, res) => {
  return res.json({
    data: "You are Viewing the Protected Content of the Page",
  });
};
