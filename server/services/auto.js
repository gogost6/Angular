const Auto = require('../models/Auto');
const User = require('../models/User');

async function getAll() {
    const autos = Auto.find({}).lean();
    return autos;
}

async function create(auto, email) {
    let user = await User.findOne({ email });
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

async function deleteAuto(id) {
    await Auto.findByIdAndRemove({ _id: id }, (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log("Successful deletion");
    });
}

module.exports = {
    create,
    getAll,
    getById,
    edit,
    deleteAuto
}