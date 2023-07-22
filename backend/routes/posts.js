const express = require('express');
const { get_posts, get_singlePost, create_post, delete_post, edit_post, post_comment, get_comments, get_posts_user } = require('../controllers/postControllers')

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

// GET comments
postRouter.get('/:id/comment', get_comments)

// GET single post by user
postRouter.get('/:username/user', get_posts_user)


module.exports = postRouter