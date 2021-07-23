const express = require('express');

const cookieParser = require('cookie-parser')

const auth = require('../middlewares/auth');

module.exports = (app) => {

    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(auth());
}