const User = require('../models/userModel')

//Login User
const loginUser = async (req, res) => {
    res.json({message: 'Logged in'})
}

//Signup User
const signupUser = async (req, res) => {
    res.json({message: 'Signed up'})
}

module.exports = { signupUser, loginUser }