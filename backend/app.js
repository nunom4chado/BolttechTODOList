require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");

const authController = require("./controllers/authController");

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
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).send({
      message: "invalid token",
    });
  }

  next(error);
});

module.exports = app;
