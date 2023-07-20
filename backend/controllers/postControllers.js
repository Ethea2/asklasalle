const Post = require('../models/postsModel')
const mongoose = require('mongoose')

// GET all posts
const get_posts = async (req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1})
    res.status(200).json(posts)
}

// GET a single post
const get_singlePost = async (req, res) =>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'This post does not exist'})
    }
    const post = await Post.findById(id)

    if(!post){
        return res.status(404).json({error: 'This post does not exist!'})
    }
    res.status(200).json(post)
}

// CREATE a new post
const create_post = async (req, res) => {
    const {user, title, body, upvote, downvote, replies} = req.body
    try {
        const post = await Post.create({user, title, body, upvote, downvote, replies})
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a post
const delete_post = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'This post does not exist'})
    }

    const post = await Post.findOneAndDelete({_id: id})
    if(!post){
        return res.status(404).json({error: 'This post does not exist!'})
    }
    res.status(200).json(post)
}

// UPDATE a post
const edit_post = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'This post does not exist'})
    }

    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!post){
        return res.status(404).json({error: 'This post does not exist!'})
    }
    res.status(200).json(post)
}

module.exports = {
    get_posts,
    get_singlePost,
    create_post,
    delete_post,
    edit_post
}