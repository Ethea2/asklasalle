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
    downvote_comment,
    undo_downvote,
    undo_upvote,
    undo_upvote_comment,
    undo_downvote_comment} = require('../controllers/postControllers')
const requireAuth = require('../middlewear/requireAuth')

const postRouter = express.Router();

//SEARCH posts
postRouter.get('/search', search_post)

// GET all posts
postRouter.get('/', get_posts)

// GET single post  
postRouter.get('/:id', get_singlePost)

// GET comments
postRouter.get('/:id/comment', get_comments)

// GET single post by user
postRouter.get('/:username/user', get_posts_user)

// require authentication for posting, editing, and deleting
postRouter.use(requireAuth)


//UPVOTE
postRouter.post('/:id/upvote', upvote)

//DOWNVOTE
postRouter.post('/:id/downvote', downvote)

//UPVOTE comment
postRouter.post('/:id/comment/:commentId/upvote', upvote_comment)

//DOWNVOTE comment
postRouter.post('/:id/comment/:commentId/downvote', downvote_comment)

//UNDO downvote 
postRouter.post('/:id/undoDownvote', undo_downvote)

//UNDO upvote 
postRouter.post('/:id/undoUpvote', undo_upvote)

//UNDO upvote comment
postRouter.post('/:id/comment/:commentId/undoUpvote', undo_upvote_comment)

//UNDO downvote comment
postRouter.post('/:id/comment/:commentId/undoDownvote', undo_downvote_comment)

// POST a new post
postRouter.post('/', create_post)

// DELETE a post
postRouter.delete('/:id', delete_post)

// UPDATE a single post
postRouter.patch('/:id', edit_post)

// POST a new comment
postRouter.post('/:id/comment', post_comment)

//DELETE comment
postRouter.delete('/:postId/comment/:commentId', delete_comment)

//EDIT comment
postRouter.patch('/:id/comment/:commentId', edit_comment)

module.exports = postRouter