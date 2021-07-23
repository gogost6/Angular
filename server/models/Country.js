const { model, Schema } = require('mongoose');

const schema = {
    country: { type: String, require: true },
    cities: { type: Array, require: true },
    value: { type: String, require: true },
}

module.exports = model('Country', schema);