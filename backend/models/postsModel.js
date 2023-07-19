const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({  
    body: {type: String, required: true},
    upVote: {type: Number, default: 0},
    downVote: {type: Number, default: 0} 
})

const postsSchema = new Schema({
    // insert code here

    // user: {
    //     type: String,
    //     required: true
    // },

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
        default: 0
    },
    downVote: {
        type: Number,
        default: 0
    },
    comments: [commentsSchema]

}, {timestamps: true})

module.exports = mongoose.model('Post', postsSchema);