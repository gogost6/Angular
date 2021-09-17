const express = require("express");
const path = require("path");

const databaseConfig = require("./server/config/database");
const routesConfig = require("./server/config/routes");
const expressConfig = require("./server/config/express");
const storage = require("./server/middlewares/storage");

const allowed = [
  ".js",
  ".css",
  ".png",
  ".jpg"
];

start();

async function start() {
  const port = process.env.PORT || 3000;
  const app = express();

  app.use(express.static(__dirname + '/dist/jdm'))
  await databaseConfig(app);
  app.use(await storage());

  expressConfig(app);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/jdm/index.html"));
});

  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
}
