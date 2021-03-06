const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const signupRoutes = require("./routers/signup");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use("auth", signupRoutes);

mongoose
  .connect("mongodb+srv://zeemish:allah@cluster0.ke1jp.mongodb.net/aaron")
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
