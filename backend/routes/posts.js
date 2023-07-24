const express = require('express');
const { get_posts,
    get_singlePost,
    create_post,
    delete_post,
    edit_post, post_comment,
    get_comments,
    get_posts_user,
    delete_comment,
    edit_comment,
    search_post, 
    upvote,
    downvote,
    upvote_comment,
    downvote_comment} = require('../controllers/postControllers')

const postRouter = express.Router();

//SEARCH posts
postRouter.get('/search', search_post)

// GET all posts
postRouter.get('/', get_posts)

// GET single post  
postRouter.get('/:id', get_singlePost)

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

//DELETE comment
postRouter.delete('/:postId/comment/:commentId', delete_comment)

//EDIT comment
postRouter.patch('/:id/comment/:commentId', edit_comment)

//UPVOTE
postRouter.patch('/:id/upvote', upvote)

//DOWNVOTE
postRouter.patch('/:id/downvote', downvote)

//UPVOTE comment
postRouter.patch('/:id/comment/:commentId/upvote', upvote_comment)

//DOWNVOTE comment
postRouter.patch('/:id/comment/:commentId/downvote', downvote_comment)

module.exports = postRouter