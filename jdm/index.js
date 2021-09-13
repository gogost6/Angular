const express = require("express");

const databaseConfig = require("./server/config/database");
const routesConfig = require("./server/config/routes");
const expressConfig = require("./server/config/express");
const storage = require("./server/middlewares/storage");

start();

async function start() {
  const port = 3000;
  const app = express();

  await databaseConfig(app);
  app.use(await storage());

  expressConfig(app);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "jdm/src/index.html"));
});

  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
}
