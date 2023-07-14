const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    // insert code here
}, {timestamps: true})

module.exports = mongoose.model('User', usersSchema);