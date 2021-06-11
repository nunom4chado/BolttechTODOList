const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.json({
    message: "Server is working!",
  });
});

module.exports = app;
