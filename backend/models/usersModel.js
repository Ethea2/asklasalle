const mongoose = require('mongoose')
const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');
//import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    // insert code here
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: false
    },
    bio: {
        default: "",
        type: String,
        required: false
    },
    img: {
        type: String,
        required: true
    }
}, { timestamps: true })

// static signup method
usersSchema.statics.signup = async function(email, password, username) {
    //default img and displayname
    const displayName = uniqueNamesGenerator({
        dictionaries: [colors, animals],
        separator: " ",
        style: "capital"
    });

    const img = `https://picsum.photos/200?random=${Math.random()}`

    // validation
    if(!email || !password) {
        throw Error('❌ All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('❌ Email is not valid')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('❌ Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, username, displayName: displayName, img: img })

    return user
}

// static login method
usersSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('❌ All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('❌ Incorrect email!')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('❌ Incorrect password!')
    }

    return user
}

module.exports = mongoose.model('User', usersSchema);