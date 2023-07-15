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
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postsSchema);