const Auto = require('../models/Auto');
const User = require('../models/User');

async function getAll() {
    const autos = Auto.find({}).lean();
    return autos;
}

async function getCarsByCriteria(data) {
    //{make = 'any', model = 'any', maxPrice = 'any', minPrice = 'any', country = 'any', city = 'any', year = 'any', engine = 'any', gears = 'any'}
    //let criteria = data.entries().map(x => x[1] !== 'any');
    console.log(data)
    // const autos = Auto.find({ make }).lean();
    // return autos;
}

async function create(auto, email) {
    let user = await User.findOne({ email });
    console.log(user);
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
    deleteAuto,
    getCarsByCriteria
}