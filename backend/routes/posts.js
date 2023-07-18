const express = require('express');
const { get_posts, get_singlePost, create_post, delete_post, update_post } = require('../controllers/postControllers')

const postRouter = express.Router();

// GET all posts
router.get('/', get_posts)

// GET single post
router.get('/:id', get_singlePost)

// POST a new post
router.post('/', create_post)

// DELETE a post
router.delete('/:id', delete_post)

// UPDATE a single post
router.patch('/:id', update_post)

module.exports = postRouter