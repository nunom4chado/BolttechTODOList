const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = require("express").Router();

const User = require("../models/userModel");

authRouter.post("/register", async (req, res, next) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).send({
      message: "username, password and name are required fields.",
    });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: username,
      name: name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).send(savedUser);
  } catch (exception) {
    next(exception);
  }
});

authRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username: username });
  const correctPassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && correctPassword)) {
    return response.status(401).send({
      message: "invalid username or password",
    });
  }

  const userInfoIntoToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userInfoIntoToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = authRouter;
