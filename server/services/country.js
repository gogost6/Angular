const Country = require('../models/Country')

async function create(country) {
    const record = new Country(country);
    await record.save();
}

module.exports = {
    create
}