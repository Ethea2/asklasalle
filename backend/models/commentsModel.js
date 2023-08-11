const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    username: {
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
    edited: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentsSchema);