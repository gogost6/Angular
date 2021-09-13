const router = require("express").Router();

const autoController = require('../controllers/auto');
const userController = require('../controllers/user');

router.use('/auto', autoController);
router.use('/user', userController);

module.exports = router;