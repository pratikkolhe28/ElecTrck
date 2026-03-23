const mongoose = require('mongoose')

const aadhaarSchema = new mongoose.Schema({
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
    length: 12
  },
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  hasVoted: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Aadhaar', aadhaarSchema)