const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest, isAuth } = require('../middlewares/guards');
// const { preloadTrip } = require('../middlewares/preload');
router.post('/post-car', isAuth(),
    body('make')
        .notEmpty()
        .withMessage('The make should not be empty!'),
    body('model')
        .notEmpty()
        .withMessage('The model should not be empty!'),
    body('engine')
        .notEmpty()
        .withMessage('The engine should not be empty!'),
    body('condition')
        .notEmpty()
        .withMessage('The condition should not be empty!'),
    body('gears')
        .notEmpty()
        .withMessage('The gears should not be empty!'),
    body('type')
        .notEmpty()
        .withMessage('The car type should not be empty!'),
    body('price')
        .notEmpty()
        .withMessage('The price should not be empty!'),
    body('currency')
        .notEmpty()
        .withMessage('The currency should not be empty!'),
    body('mileage')
        .notEmpty()
        .withMessage('The mileage should not be empty!'),
    body('color')
        .notEmpty()
        .withMessage('The color should not be empty!'),
    body('country')
        .notEmpty()
        .withMessage('The country should not be empty!'),
    body('city')
        .notEmpty()
        .withMessage('The city should not be empty!'),
    body('description')
        .notEmpty()
        .withMessage('The description should not be empty!'),
    async (req, res) => {
        try {
            console.log(req.user + 'at controller');
            const errors = Object.values(validationResult(req).mapped());
            if (errors.length > 0) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }
            //const carData = await req.storage.create(req.body);
            
            //res.json(carData);
        } catch (err) {
            console.log(req.user)
            console.log(err);
            res.status(403).end();
        }
    });

module.exports = router;