const winston = require("winston");
// require("winston-mongodb");

module.exports = function () {
  // winston configuration
  winston.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );

  winston.add(new winston.transports.File({ filename: "logfile.log" }));

  // winston.add(
  //   new winston.transports.MongoDB({
  //     level: "info",
  //     db: "mongodb://localhost:27017/vidly_errors",
  //     options: {
  //       useUnifiedTopology: true,
  //     },
  //     format: winston.format.metadata(),
  //   })
  // );

  // process.on("uncaughtException", (err) => {
  //   winston.error(err.message, err);
  //   process.exit(1);
  // });

  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (err) => {
    throw err;
  });
};
