const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postsSchema = new Schema({
    // insert code here
}, {timestamps: true})

module.exports = mongoose.model('Post', postsSchema);