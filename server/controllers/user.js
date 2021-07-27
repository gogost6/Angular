const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isAuth, isGuest } = require('../middlewares/guards');

router.post('/register', isGuest(),
    body('email')
        .trim()
        .isEmail()
        .withMessage('The email should be valid!'),
    body('username')
        .trim()
        .isAlphanumeric()
        .withMessage('The username should contain only chars!')
        .isLength({min: 5})
        .withMessage('The username should be atleast 5 chars!'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('The password input should be atleast 4 characters long!'),
    body('rePassword').trim().custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\'t match');
        }
        return true;
    }),
    async (req, res) => {
        try {
            const errors = Object.values(validationResult(req).mapped());
            if (errors.length > 0) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }
            console.log(req.body);

            const userData = await req.auth.register(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);

            // const ctx = {
            //     title: 'Register page',
            //     errors: err.message.split('\n'),
            //     data: {
            //         email: req.body.email
            //     }
            // };
            res.status(403).end();
        }
    });

router.post('/login', isGuest(),
    body('username')
        .trim()
        .isAlphanumeric()
        .withMessage('The username should contain only chars!'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('The password input shouldbe atleast 4 characters long!'),
    async (req, res) => {
        try {
            const errors = Object.values(validationResult(req).mapped());
            if (errors.length > 0) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }

            const userData = await req.auth.login(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);

            // const ctx = {
            //     title: 'Login page',
            //     errors: err.message.split('\n'),
            //     data: {
            //         email: req.body.email
            //     }
            // };
            res.status(403).end();
        }
    });

router.get('/logout', (req, res) => {
    res.status(204).end();
})

module.exports = router;