const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const { COOKIE_NAME, TOKEN_SECRET, COOKIE_DOMAIN } = require('../config');
const { isAuth, isGuest } = require('../middlewares/guards');
const userService = require('../services/user');

router.get('/register', (req, res) => {
    res.send('WORKS')
})

router.post('/register', isGuest(),
    body('email')
        .trim()
        .isEmail()
        .withMessage('The email should be valid!'),
    body('username')
        .trim()
        .isAlphanumeric()
        .withMessage('The username should contain only chars!')
        .isLength({ min: 5 })
        .withMessage('The username should be atleast 5 chars!'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('The password input should be atleast 4 characters long!'),
    body('rePass').trim().custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\'t match');
        }
        return true;
    }),
    async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const errors = Object.values(validationResult(req).mapped());
            if (errors.length > 0) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }
            const existingByEmail = await userService.getUserByEmail(email);
            const existingByUsername = await userService.getUserByUsername(username);

            if (existingByEmail) {
                throw new Error('Email is registered already');
            }

            if (existingByUsername) {
                throw new Error('Username is taken!');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userService.createUser(email, username, hashedPassword);

            const userViewModel = { _id: user._id, email: user.email, username: user.username, };
            const token = jwt.sign(userViewModel, TOKEN_SECRET);
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.json(userViewModel);
        } catch (err) {
            console.log(err);
            res.status(401).json({ message: 'Error with login!' });
        }
    });

router.post('/login',
    body('username')
        .trim()
        .isAlphanumeric()
        .withMessage('The username should contain only chars!'),
    body('password')
        .trim()
        .isLength({ min: 4 })
        .withMessage('The password input should be atleast 4 characters long!'),
    async (req, res) => {
        try {
            const { username, password } = req.body;

            const errors = Object.values(validationResult(req).mapped());
            if (errors.length > 0) {
                throw new Error(errors.map(e => e.msg).join('\n'));
            }
            const user = await userService.getUserByUsername(username);

            if (!user) {
                throw new Error('Wrong username or password!');
            } else {
                const isMatch = await bcrypt.compare(password, user.hashedPassword);
                if (!isMatch) {
                    throw new Error('Wrong username or password!');
                } else {
                    const userViewModel = { _id: user._id, email: user.email, username: user.username, };
                    const token = jwt.sign(userViewModel, TOKEN_SECRET);
                    console.log('this is the token ->> ' + token);
                    res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'Lax' });
                    console.log('this is the cookie ->> ' + req.cookies[COOKIE_NAME]);
                    res.json(userViewModel);
                }
            }
        } catch (err) {
            console.log(err);
            res.status(401).json({ message: 'Error with login!' });
        }
    });

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME).status(200).end();
})

module.exports = router;