const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({
    // insert code here

    // Idk if user is needed kasi autogenerated naman
    // ito pero jic i have it here
    user: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentsSchema);