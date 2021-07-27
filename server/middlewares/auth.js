const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { COOKIE_NAME, TOKEN_SECRET } = require('../config');

const userService = require('../services/user');

module.exports = () => (req, res, next) => {
    req.auth = {
        register, 
        login,
        logout
    }

    if(readToken(req)) {
        next();
    }

    async function register({email, password, username}) {
        const existingByEmail = await userService.getUserByEmail(email);
        const existingByUsername = await userService.getUserByUsername(username);

        if(existingByEmail) {
            throw new Error('Email is registered already');
        } 

        if(existingByUsername) {
            throw new Error('Username is taken!');
        } 

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userService.createUser(email, hashedPassword, username);
        req.user = createToken(user);
    }

    async function login({ username, password }) {
        const user = await userService.getUserByUsername(username);

        if (!user) {
            throw new Error('Wrong username or password!');
        } else {
            const isMatch = await bcrypt.compare(password, user.hashedPassword);
            if (!isMatch) {
                throw new Error('Wrong username or password!');
            } else {
                req.user = createToken(user);
            }
        }
    }

    async function logout() {
        res.clearCookie(COOKIE_NAME);
    }

    function createToken(user) {
        const userViewModel = { _id: user._id, email: user.email, username: user.username,};
        const token = jwt.sign(userViewModel, TOKEN_SECRET);
        res.cookie(COOKIE_NAME, token, {httpOnly: true});

        return userViewModel;
    }

    function readToken(req) {
        const token = req.cookies[COOKIE_NAME];
        if(token) {
            try {
                const userData = jwt.verify(token, TOKEN_SECRET);
                res.locals.user = userData;
                console.log('Known user ' + userData.email);
            } catch(err) {
                res.clearCookie(COOKIE_NAME);
                //res.redirect('/user/login');
                res.status(204).end();
                return false;
            }
        }
        return true;
    }
}
