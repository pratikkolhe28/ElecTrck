const mongoose = require('mongoose')

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  shortName: {
    type: String,
    required: true
  },
  symbol: {
    type: String
  },
  foundedYear: {
    type: Number
  },
  ideology: {
    type: String
  },
  manifesto: {
    type: String
  },
  representativeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#ffffff'
  }
}, { timestamps: true })

module.exports = mongoose.model('Party', partySchema)