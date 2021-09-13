function preloadCar() {
    return async (req, res, next) => {
        req.data = req.data || {};

        try {
            const car = await req.storage.getById(req.params.id);

            if (car) {
                req.data.car = car;
            }
        } catch (err) {
            console.error('Database error:', err.message);
        }

        next();
    };
}

module.exports = {
    preloadCar
};