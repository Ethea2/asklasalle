const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postsSchema = new Schema({
    // insert code here
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    upVote: {
        type: Number,
        required: false
    },
    downVote: {
        type: Number,
        required: false
    },
    replies: {
        type: Number,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postsSchema);