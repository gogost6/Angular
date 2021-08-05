const { model, Schema } = require('mongoose');

const schema = {
    imageUrls: { type: Array },
    condition: { type: String, required: true },
    documents: { type: String, required: true },
    type: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    dateMade: { type: Date, required: true },
    variant: { type: String },
    country: { type: String, required: true },
    mileage: { type: Number, required: true },
    city: { type: String, required: true },
    yearMade: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 1 },
    currency: { type: String, required: true },
    description: { type: String, required: true },
    gears: { type: String, required: true },
    horsePower: { type: Number, required: true },
    color: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    // features: {
    //     interior: [{ type: String }],
    //     security: [{ type: String }],
    //     safety: [{ type: String }],
    //     exterior: [{ type: String }],
    //     other: [{ type: String }]
    // },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
}

module.exports = model('Auto', schema);
