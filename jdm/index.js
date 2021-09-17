const { log } = require("console");
const express = require("express");
const path = require("path");

const databaseConfig = require("./server/config/database");

const expressConfig = require("./server/config/express");
const storage = require("./server/middlewares/storage");

const allowed = [".js", ".css", ".png", ".jpg"];

async function start() {

  const port = process.env.PORT || 5000;
  const app = express();

  app.use(express.static(__dirname + "/dist/jdm"));
  await databaseConfig(app);
  app.use(storage());

  expressConfig(app);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/jdm/index.html"));
  });

  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
}

start();
