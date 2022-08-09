const express = require("express");
require("express-async-errors");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Welcome to vidly backend");
});

module.exports = router;
