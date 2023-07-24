const Post = require('../models/postsModel.js');
const Comment = require("../models/commentsModel.js")
const mongoose = require('mongoose')

// GET all posts
const get_posts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json(posts)
}

// GET all posts
const get_posts_user = async (req, res) => {
    const { username } = req.params

    const posts = await Post.find({"username" : username }).select({})
    
    if (!posts) {
        return res.status(404).json({ error: 'There are no posts!' })
    }
    res.status(200).json(posts)
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

// GET all post comments
const get_comments = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid post ID' });
    }

    try {
        // Find the post by its ID and populate the 'replies' field with comments
        const post = await Post.findById(id).populate('replies');

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Extract the comments from the populated 'replies' field of the post
        const comments = post.replies;

        if (!comments.length) {
            return res.status(404).json({ error: 'No comments found for this post' });
        }

        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

//DELETE comment
const delete_comment = async (req, res) => {
    const { postId, commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({ error: 'Invalid post or comment ID' });
    }

    try {
        // Find the post by its ID
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the commentId is in the replies array of the post
        if (!post.replies.includes(commentId)) {
            return res.status(404).json({ error: 'Comment not found for this post' });
        }

        // Filter out the commentId from the replies array of the post
        post.replies = post.replies.filter(replyId => !replyId.equals(commentId));

        // Save the updated post without the deleted commentId
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

//EDIT comment
const edit_comment = async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({ error: 'Invalid comment ID' });
    }

    try {
        // Find the comment by its ID
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Update the 'body' property of the comment
        comment.body = req.body.body || comment.body;

        // Save the updated comment
        await comment.save();

        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const search_post = async (req, res) => {
    const { keywords } = req.query;

    if (!keywords) {
        return res.status(400).json({ error: 'Please provide search keywords' });
    }

    try {
        // Split the search keywords into individual words
        const keywordArray = keywords.split(' ');

        // Create a regular expression pattern to match any of the words in 'title' or 'body'
        const regexPattern = keywordArray.map(keyword => `(?=.*\\b${keyword}\\b)`).join('');

        // Find posts that match the regex pattern in 'title' or 'body'
        const posts = await Post.find({
            $or: [
                { title: { $regex: regexPattern, $options: 'i' } },
                { body: { $regex: regexPattern, $options: 'i' } }
            ]
        });

        if (!posts.length) {
            return res.status(404).json({ error: 'No posts found matching the search criteria' });
        }

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    get_posts,
    get_singlePost,
    get_posts_user,
    create_post,
    delete_post,
    edit_post,
    post_comment,
    get_comments,
    delete_comment,
    edit_comment,
    search_post
}