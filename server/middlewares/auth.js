const { COOKIE_NAME, TOKEN_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

module.exports = () => (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];
    console.log('auth middleware cookies ->> ' + req.cookies[COOKIE_NAME]);

    try {
        if (token) {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            console.log(req.user);
            console.log('Known user ' + userData.email + '->> req.user from read token ');
        }
    } catch (err) {
        console.log(err);
        res.clearCookie(COOKIE_NAME);
        res.status(401).json({ message: 'Invalid token!' });
    }
    next();    
}
