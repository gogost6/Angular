const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({
        origin: true,
        credentials: true
    }));
    app.use(logger());
    app.use(auth());
}