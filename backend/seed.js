const mongoose = require('mongoose')
const Aadhaar = require('./models/Aadhaar')
require('dotenv').config()

const mockAadhaarData = [
  { aadhaarNumber: '234567890123', name: 'Pratik Kolhe', dateOfBirth: '2004-05-15', state: 'Maharashtra', hasVoted: false },
  { aadhaarNumber: '345678901234', name: 'Rahul Sharma', dateOfBirth: '1990-03-22', state: 'Maharashtra', hasVoted: false },
  { aadhaarNumber: '456789012345', name: 'Priya Patel', dateOfBirth: '1985-07-10', state: 'Gujarat', hasVoted: false },
  { aadhaarNumber: '567890123456', name: 'Amit Singh', dateOfBirth: '2000-11-30', state: 'Delhi', hasVoted: false },
  { aadhaarNumber: '678901234567', name: 'Sneha Desai', dateOfBirth: '1995-08-25', state: 'Maharashtra', hasVoted: false },
  { aadhaarNumber: '789012345678', name: 'Ravi Kumar', dateOfBirth: '1988-01-14', state: 'Karnataka', hasVoted: false },
  { aadhaarNumber: '890123456789', name: 'Anita Joshi', dateOfBirth: '2010-12-01', state: 'Maharashtra', hasVoted: false },
  { aadhaarNumber: '901234567890', name: 'Vikram Nair', dateOfBirth: '1975-06-18', state: 'Kerala', hasVoted: false },
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected!')

    await Aadhaar.deleteMany({})
    console.log('Old Aadhaar data cleared!')

    await Aadhaar.insertMany(mockAadhaarData)
    console.log('Mock Aadhaar data seeded successfully!')

    console.log('Total records:', mockAadhaarData.length)

    const User = require('./models/User')
    const bcrypt = require('bcryptjs')

    const adminExists = await User.findOne({ role: 'admin' })
    if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    await User.create({
        name: 'Election Commission Admin',
        email: 'admin@electrck.com',
        password: hashedPassword,
        role: 'admin',
        isApproved: true
    })
    console.log('Admin created successfully!')
    }

    const Party = require('./models/Party')

    await Party.deleteMany({})
    await Party.insertMany([
    { name: 'Bharatiya Janata Party', shortName: 'BJP', ideology: 'National Conservatism', foundedYear: 1980, color: '#FF9933', isApproved: true },
    { name: 'Indian National Congress', shortName: 'INC', ideology: 'Social Democracy', foundedYear: 1885, color: '#00BFFF', isApproved: true },
    { name: 'Aam Aadmi Party', shortName: 'AAP', ideology: 'Anti-corruption', foundedYear: 2012, color: '#00BFAF', isApproved: true },
    { name: 'Shiv Sena', shortName: 'SS', ideology: 'Hindu Nationalism', foundedYear: 1966, color: '#FF6600', isApproved: true },
    ])
    console.log('Parties seeded!')
    mongoose.connection.close()

  } catch (err) {
    console.log('Error seeding:', err.message)
    mongoose.connection.close()
  }
}

seedDB()