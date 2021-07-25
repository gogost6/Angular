const autoController = require('../controllers/auto');
const userController = require('../controllers/user');

module.exports = (app) => {
    app.use('/auto', autoController);
    app.use('/user', userController);
    app.all('*', (req, res) => {
        res.json(404, {error: 'Page Not Found'});
    });
}