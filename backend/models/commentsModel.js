const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({
    // insert code here
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentsSchema);