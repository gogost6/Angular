const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isOwner, isGuest, isAuth } = require('../middlewares/guards');
const { preloadTrip } = require('../middlewares/preload');

router.get('/', async (req, res) => {
    
});

module.exports = router;