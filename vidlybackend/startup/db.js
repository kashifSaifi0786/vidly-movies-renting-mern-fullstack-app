const config = require("config");
const mongoose = require("mongoose");

module.exports = function () {
  const db = config.get("db");
  // database connection
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`Connected to ${db}...`);
    });
};
