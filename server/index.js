const express = require('express');

const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const expressConfig = require('./config/express');
const logger = require('./middlewares/logger');
const storage = require('./middlewares/storage');
const cors = require('cors')

start();

async function start() {
    const port = 3000;
    const app = express();
    app.use(cors());
    app.use(logger());
    
    await databaseConfig(app);
    expressConfig(app);
    
    app.use(await storage());
    routesConfig(app);

    app.listen(port , () => console.log(`Server is running on http://localhost:${port}`));
}

