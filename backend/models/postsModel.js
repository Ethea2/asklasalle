const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({  
    user: {type: String, required: true},
    body: {type: String, required: true},
    upVote: {type: Number, default: 0},
    downVote: {type: Number, default: 0} 
})

const postsSchema = new Schema({
    // insert code here

    username: {
        type: String,
        required: true
    },
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
    replies: [{commentsSchema}]

}, {timestamps: true})

module.exports = mongoose.model('Post', postsSchema);