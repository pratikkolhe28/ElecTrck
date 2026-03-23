const express = require('express')
const router = express.Router()
const Vote = require('../models/Vote')
const Aadhaar = require('../models/Aadhaar')
const Party = require('../models/Party')
const User = require('../models/User')
const { protect } = require('../middleware/authMiddleware')

router.get('/parties', async (req, res) => {
  try {
    const parties = await Party.find({ isApproved: true })
    res.json(parties)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

router.post('/cast', protect, async (req, res) => {
  try {
    const { partyId } = req.body
    const userId = req.user.id

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.hasVoted) {
      return res.status(400).json({ message: 'You have already cast your vote.' })
    }

    const party = await Party.findById(partyId)
    if (!party || !party.isApproved) {
      return res.status(400).json({ message: 'Invalid party selected.' })
    }

    await Vote.create({
      aadhaarNumber: user.aadhaarNumber,
      partyId
    })

    await User.findByIdAndUpdate(userId, { hasVoted: true })
    await Aadhaar.findOneAndUpdate(
      { aadhaarNumber: user.aadhaarNumber },
      { hasVoted: true }
    )

    res.json({
      message: 'Vote cast successfully!',
      party: party.name
    })

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'You have already cast your vote.' })
    }
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

router.get('/results', async (req, res) => {
  try {
    const parties = await Party.find({ isApproved: true })

    const results = await Promise.all(
      parties.map(async (party) => {
        const count = await Vote.countDocuments({ partyId: party._id })
        return {
          partyId: party._id,
          name: party.name,
          shortName: party.shortName,
          color: party.color,
          votes: count
        }
      })
    )

    const totalVotes = results.reduce((sum, r) => sum + r.votes, 0)

    res.json({ results, totalVotes })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router