const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    // insert code here
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    numPosts: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('User', usersSchema);