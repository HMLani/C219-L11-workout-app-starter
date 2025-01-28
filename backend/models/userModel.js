const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
})

//Static method to signup
userSchema.statics.signup = async function( email, password ) {
    //Validattion
    if ( !email || !password ) {
        throw Error('Email and password are required')
    }

    if ( !validator.isEmail( email ) ) {
        throw Error('Invalid email')
    }

    if ( !validator.isStrongPassword( password ) ) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ email })
    const saltPassword = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, saltPassword)
    const user = await this.create({ email, password: hashedPassword })

    if ( exists ) {
        throw Error('Email already in use')
    }

    return user
}

//Static method to login
userSchema.statics.login = async function( email, password ) {
    if ( !email || !password ) {
        throw Error('Email and password are required')
    }
    
    const user = await this.findOne({ email })
    if ( !user ) {
        throw Error('Invalid email')
    }
    
    const match = await bcrypt.compare(password, user.password)
    if ( !match ) {
        throw Error('Invaild password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)