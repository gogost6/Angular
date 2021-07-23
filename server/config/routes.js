const autoController = require('../controllers/auto');
const userController = require('../controllers/user');

module.exports = (app) => {
    app.get('/', (req, res) => res.redirect('/auto'));
    app.use('/auto', autoController);
    app.use('/user', userController);
    app.all('*', (req, res) => {
        res.render('404', {title: 'Page Not Found'});
    });
}