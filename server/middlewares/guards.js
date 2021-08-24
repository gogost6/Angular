module.exports = {
    isAuth() {
        return (req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.status(400);
            }
        };
    },
    isGuest() {
        return (req, res, next) => {
            if (!req.user) {
                next();
            } else {
                res.status(400);
            }
        };
    },
    isOwner() {
        return (req, res, next) => {
            if (req.data.car && req.user && (req.data.car.owner.email == res.locals.user.email)) {
                next();
            } else {
                res.status(400);
            }
        };
    }
};