const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true
  },
  partyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Party',
    required: true
  },
  votedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Vote', voteSchema)