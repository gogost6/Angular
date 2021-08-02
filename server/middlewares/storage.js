const auto = require('../services/auto');

async function init() {
    return (req, res, next) => {
        const storage = Object.assign({}, auto);
        req.storage = storage;
        next();
    };
}

module.exports = init;