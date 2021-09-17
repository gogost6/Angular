const mongoose = require("mongoose");
const config = require(".");

module.exports = (app) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("useFindAndModify", false);

    const db = mongoose.connection;
    db.on("error", (err) => {
      console.error("DB error: " + err);
      reject(err);
    });
    db.once("open", function () {
      console.log("DB connected!");
      resolve();
    });
  });
};
