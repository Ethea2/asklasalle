const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
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
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    edited: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postsSchema);