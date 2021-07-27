const auto = require('../services/auto');
const user = require('../services/user');

async function init() {
    return (req, res, next) => {
        const storage = Object.assign({}, auto);
        const userData = Object.assign({}, user);
        req.storage = storage;
        req.user = userData;
        next();
    };
}

module.exports = init;