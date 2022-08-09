const error = require("../middlewares/error");
const home = require("../routes/home");
const genres = require("../routes/genres");
const movies = require("../routes/movies");
const customers = require("../routes/customers");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const returns = require("../routes/returns");
const express = require("express");
const cors = require("cors");

module.exports = function (app) {
  //   setting up middlewares
  app.use(express.json());
  app.use(cors());
  // routes
  app.use("/", home);
  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/customers", customers);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/returns", returns);
  app.use(error);
};
