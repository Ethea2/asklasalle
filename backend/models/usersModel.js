const mongoose = require('mongoose')
//import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

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
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('User', usersSchema);