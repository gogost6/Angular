const mongoose = require("mongoose");
const config = require(".");

module.exports = (app) => {
  console.log(process.env)
  if(process.env.NODE_ENV == 'production') {
    const { MongoClient } = require('mongodb');
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });
  } else {
    mongoose.connect(config.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("useFindAndModify", false);
  
    const db = mongoose.connection;
    db.on("error", (err) => {
      console.error("DB error: " + err);
    });
    db.once("open", function () {
      console.log("DB connected!");
    });
  }
};
