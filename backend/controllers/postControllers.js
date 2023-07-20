const Post = require('../models/postsModel.js');
const Comment = require("../models/commentsModel.js")
const mongoose = require('mongoose')

// GET all posts
const get_posts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json(posts)
    console.log("successfully connected")
}

// GET a single post
const get_singlePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This post does not exist' })
    }
    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({ error: 'This post does not exist!' })
    }
    res.status(200).json(post)
}

// CREATE a new post
const create_post = async (req, res) => {
    const { username, title, body, upvote, downvote, replies } = req.body
    try {
        const post = await Post.create({ username, title, body, upvote, downvote, replies })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a post
const delete_post = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This post does not exist' })
    }

    const post = await Post.findOneAndDelete({ _id: id })
    if (!post) {
        return res.status(404).json({ error: 'This post does not exist!' })
    }
    res.status(200).json(post)
}

// UPDATE a post
const edit_post = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This post does not exist' })
    }

    const post = await Post.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!post) {
        return res.status(404).json({ error: 'This post does not exist!' })
    }
    res.status(200).json(post)
}

//POST a comment
const post_comment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This post does not exist' });
    }

    try {
        // Find the post with the specified id
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'This post does not exist' });
        }

        // Create a new comment using the Comment model
        const newComment = new Comment({
            username: req.body.username,
            body: req.body.body,
            upVote: req.body.upVote || 0,
            downVote: req.body.downVote || 0
        });

        // Save the new comment to the database
        const savedComment = await newComment.save();

        // Add the new comment's ObjectId to the replies array of the post
        post.replies.push(savedComment._id);

        // Save the updated post
        await post.save();

        // Return the saved comment
        res.status(201).json(savedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
    console.log("post_comment triggered")
}



module.exports = {
    get_posts,
    get_singlePost,
    create_post,
    delete_post,
    edit_post,
    post_comment
}