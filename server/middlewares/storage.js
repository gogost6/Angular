const auto = require('../services/auto');
const user = require('../services/user');

async function init() {
    return (req, res, next) => {
        const storage = Object.assign({}, auto);
        req.storage = storage;
        next();
    };
}

module.exports = init;