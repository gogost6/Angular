const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');
const { TOKEN_SECRET } = require('../config');
const routes = require("./routes");

module.exports = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({
        origin: true,
        credentials: true
    }));
    app.use(cookieParser(TOKEN_SECRET));
    app.use(logger());
    app.use(auth());
    app.use(express.json());

    app.use('/api', routes);
}