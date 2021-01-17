const mongoose = require('mongoose');


// request Schema
const RequestSchema = mongoose.Schema({
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
  phoneNumber: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  assignedMechanic: {
    type: String,
    default:'omera'
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ["Pending", "Approved", "Declined","Done"]
  }
});

const Request = module.exports = mongoose.model('Request', RequestSchema);