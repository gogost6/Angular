const Auto = require('../models/Auto');
const User = require('../models/User');
const mongoose = require('mongoose');

async function getAll() {
    const autos = Auto.find({}).lean();
    return autos;
}

async function getRecent() {
    const autos = Auto.find({}).sort({ date: -1 }).limit(3).lean();
    return autos;
}

async function getCarsByCriteria(data) {
    let obj = {};
    let criteria = Object.entries(data).filter(x => x[1] !== '').forEach(x => {
        if (x[0] == 'minPrice' || x[0] == 'maxPrice') {
            obj.price = {};
        }
        if (x[0] == 'dateMade') {
            obj[x[0]] = { $gte: new Date(x[1].slice(6)) };
        } else if (x[0] == 'minPrice') {
            Object.assign(obj.price, { $gte: Number(x[1]) });
        } else if (x[0] == 'maxPrice') {
            Object.assign(obj.price, { $lt: Number(x[1]) });
        } else {
            obj[x[0]] = x[1];
        }
    });
    const autos = Auto.find(obj).lean();
    return autos;
}

async function create(auto, email) {
    let user = await User.findOne({ email });
    Object.assign(auto, { owner: user });
    const record = new Auto(auto);
    await record.save();
    user.createdAutos.push(record);
    await user.save();
}

async function getById(id) {
    const auto = Auto.findOne({ _id: id }).populate('owner').lean();
    return auto;
}

async function edit(id, data) {
    let record = await Auto.findByIdAndUpdate({ _id: id }, data);
    return record.save();
}

async function deleteAuto(id, userId) {
    console.log(id, userId)
    const record = await User.findOneAndUpdate(
        { _id: userId }, { "$pull": { "createdAutos": new mongoose.mongo.ObjectId(id) } },
        { safe: true, multi: true, new: true });
    await record.save();
    Auto.findByIdAndRemove({ _id: id }, (err, docs) => {
        try {
            if (err) {
                throw new Error(err);
            } else {
                console.log("Successful deletion " + docs);
            }
        } catch (err) {
            console.log('Wrong data!');
        }
    });
}

module.exports = {
    create,
    getAll,
    getById,
    edit,
    deleteAuto,
    getCarsByCriteria,
    getRecent
}