const Auto = require('../models/Auto');
const User = require('../models/User');

async function getAll(name) {
    const autos = Auto.find({}).lean();
    return autos;
}

async function create(auto, email) {
    let user = await User.findOne({ email });
    const record = new Auto(auto);
    await record.save();
    user.createdTrips.push(record);
    await user.save();
}

async function getById(id) {
    const auto = Auto.findOne({ _id: id }).populate('owner').populate('buddies').lean();
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

// async function joinTrip(id, email) {
//     const trip = await Auto.findOne({ _id: id });
//     const user = await User.findOne({ email });

//     if (!trip || !user) {
//         throw new ReferenceError('Wrong data!');
//     }

//     if (trip.seats <= 0) {
//         throw new ReferenceError('No free seats left!');
//     }

//     trip.seats -= 1;
//     trip.buddies.push(user);
//     await trip.save();
//     user.tripsHistory.push(trip);
//     await user.save();
// }

// async function enroll(id, username) {
//     const tut = await Tut.findOne({ _id: id });
//     const user = await User.findOne({ username });

//     if (!tut || !user) {
//         throw new ReferenceError('Wrong data!');
//     }

//     const notOwner = tut.owner != user.username ? true : false;

//     if (notOwner) {
//         tut.usersEnrolled.push(user);
//         await tut.save();
//         user.enrolledCourses.push(tut)
//         await user.save();
//     } else {
//         throw new Error('Owner can\'t enroll for his own course!');
//     }
// }

module.exports = {
    create,
    getAll,
    getById,
    edit,
    deleteAuto
}