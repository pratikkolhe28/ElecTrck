const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')
const Aadhaar = require('../models/Aadhaar')

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

router.post('/register/citizen', async (req, res) => {
  try {
    const { name, email, password, aadhaarNumber } = req.body

    const aadhaarRecord = await Aadhaar.findOne({ aadhaarNumber })
    if (!aadhaarRecord) {
      return res.status(400).json({ message: 'Aadhaar number not found. You may not be eligible to vote.' })
    }

    const today = new Date()
    const dob = new Date(aadhaarRecord.dateOfBirth)
    const age = today.getFullYear() - dob.getFullYear()
    if (age < 18) {
      return res.status(400).json({ message: 'You must be 18 or older to register.' })
    }

    const existingUser = await User.findOne({ aadhaarNumber })
    if (existingUser) {
      return res.status(400).json({ message: 'This Aadhaar is already registered.' })
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'citizen',
      aadhaarNumber,
      isApproved: true
    })

    res.status(201).json({
      message: 'Citizen registered successfully',
      token: generateToken(user),
      user: { id: user._id, name: user.name, role: user.role }
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

router.post('/register/party', async (req, res) => {
  try {
    const { name, email, password, partyName, shortName, ideology, foundedYear } = req.body

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'party',
      isApproved: false
    })

    const Party = require('../models/Party')
    await Party.create({
      name: partyName,
      shortName,
      ideology,
      foundedYear,
      representativeId: user._id,
      isApproved: false
    })

    res.status(201).json({
      message: 'Party registration submitted. Waiting for admin approval.',
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    if (user.role === 'party' && !user.isApproved) {
      return res.status(403).json({ message: 'Your party registration is pending admin approval.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user),
      user: { id: user._id, name: user.name, role: user.role }
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router