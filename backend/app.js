require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");
const verifyAuthToken = require("./middleware/verifyAuthToken");

const authController = require("./controllers/authController");
const projectsController = require("./controllers/projectsController");
const tasksController = require("./controllers/tasksController");

const app = express();

app.use(express.json());

// Connection to MongoDB
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connection to MongoDB:", error.message);
  });

app.use(express.static("build"));

// ENDPOINTS
app.get("/api/ping", (req, res) => {
  res.send({
    message: "Server is working!",
  });
});

app.post("/api/ping", (req, res) => {
  const { text } = req.body;
  res.send({
    message: text,
  });
});

app.use("/api/auth", authController);
app.use("/api/projects", [verifyAuthToken], projectsController);
app.use("/api/tasks", [verifyAuthToken], tasksController);

// Handles 404 for unknown endpoints.
app.use((_req, res) => {
  res.status(404).send({ message: "unknown endpoint" });
});

// Error handling Middleware
app.use((error, _req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error.message);
  }

  if (error.name === "CastError") {
    return res.status(400).send({ message: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ message: error.message });
  }

  next(error);
});

module.exports = app;
