const mongoose = require('mongoose');

// request Schema
const InvoiceSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    serviceOne: {
        type: String,
    }
    ,
    serviceTwo: {
        type: String,
    },
    serviceThree: {
        type: String,
    },
    priceOne: {
        type: String
    },
    priceTwo: {
        type: String
    },
    priceThree: {
        type: String
    },
    totalCost: {
        type: String
    }
});

const Invoice = module.exports = mongoose.model('Invoice', InvoiceSchema);