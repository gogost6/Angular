const mongoose = require("mongoose");
const config = require(".");

module.exports = (app) => {
  if(process.env.NODE_ENV) {
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://gogog:11111@cluster0.xfvou.mongodb.net/jdm?retryWrites=true&w=majority";
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
