const express = require('express');
const { get_posts, get_singlePost, create_post, delete_post, edit_post, post_comment } = require('../controllers/postControllers')

const postRouter = express.Router();

// GET all posts
postRouter.get('/', get_posts)

// GET single post
postRouter.get('/:id',  get_singlePost)

// POST a new post
postRouter.post('/', create_post)

// DELETE a post
postRouter.delete('/:id', delete_post)

// UPDATE a single post
postRouter.patch('/:id', edit_post)

// POST a new comment
postRouter.post('/:id/comment', post_comment)


module.exports = postRouter