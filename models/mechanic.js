const mongoose = require('mongoose');

// request Schema
const MechanicSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
});

const Mechanic = module.exports = mongoose.model('Mechanic', MechanicSchema);