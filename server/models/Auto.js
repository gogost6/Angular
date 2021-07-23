const { model, Schema } = require('mongoose');

const schema = {
    condition: { type: String, required: true },
    newImport: {type: String},
    hasDocuments: {type: String},
    type: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    seats: { type: Number, required: true, default: 1},
    doors: { type: Number, required: true, default: 1},
    yearMade: { type: Number, required: true, default: 1},
    price: { type: Number, required: true, default: 1 },
    description: { type: String, required: true},
    fuel: { type: String, required: true},
    transmision: { type: String, required: true},
    horsePower: { type: Number, required: true},
    exteriorColor: { type: String, required: true},
    features: {
        interior: [{type: String}],
        security: [{type: String}],
        headlightsType: [{type: String}],
        wheels: [{type: String}],
        tyres: [{type: String}],
        parkingSensors: [{type: String}],
        extras: [{type: String}],
        interiorMaterial: [{type: String}],
        interiorColor: [{type: String}],
        history: [{type: String}],
    },
    owner:  { type: Schema.Types.ObjectId, ref: 'User' },
}

module.exports = model('Trip', schema);
