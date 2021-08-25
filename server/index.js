const express = require("express");

const databaseConfig = require("./config/database");
const routesConfig = require("./config/routes");
const expressConfig = require("./config/express");
const storage = require("./middlewares/storage");

start();

async function start() {
  const port = 3000;
  const app = express();

  await databaseConfig(app);
  app.use(await storage());

  expressConfig(app);

  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
}
