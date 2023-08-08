const Post = require('../models/postsModel.js');
const User = require('../models/usersModel.js')
const Comment = require("../models/commentsModel.js")
const mongoose = require('mongoose')


// GET all posts
const get_posts = async (req, res) => {
    const page = req.query.page || 0
    const postPerPage = 15

    const posts = await Post.find({}).sort({ createdAt: -1 }).skip(page * postPerPage).limit(postPerPage)
    res.status(200).json(posts)
}

// GET all posts
const get_posts_user = async (req, res) => {
    const { username } = req.params

    const posts = await Post.find({ "username": username }).select({})

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

//UPDATE upvote
const upvote = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('This post does not exist');
    }

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new Error('This post does not exist');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingVote = user.votedPosts.find((vote) => vote.post && vote.post.equals(id));

        if (existingVote) {
            if (existingVote.vote === 'upvote') {
                throw new Error('User already upvoted this post');
            } else {
                post.upVote++;
                post.downVote--;
                existingVote.vote = 'upvote';
            }
        } else {
            post.upVote++;
            user.votedPosts.push({ post: id, vote: 'upvote' });
        }

        await post.save();
        await user.save();

        console.log('Post updated successfully:', post);
        console.log('User after upvoting:', user);

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

//UPDATE downvote
const downvote = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('This post does not exist');
    }

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new Error('This post does not exist');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingVote = user.votedPosts.find((vote) => vote.post && vote.post.equals(id));

        if (existingVote) {
            if (existingVote.vote === 'downvote') {
                throw new Error('User already downvoted this post');
            } else {
                post.downVote++;
                post.upVote--;
                existingVote.vote = 'downvote';
            }
        } else {
            post.downVote++;
            user.votedPosts.push({ post: id, vote: 'downvote' });
        }

        await post.save();
        await user.save();

        console.log('Post updated successfully:', post);
        console.log('User after downvoting:', user);

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// undo upvote
const undo_upvote = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('This post does not exist');
    }

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new Error('This post does not exist');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingVote = user.votedPosts.find((vote) => vote.post && vote.post.equals(id));

        if (existingVote) {
            if (existingVote.vote === 'upvote') {
                post.upVote--;
                user.votedPosts = user.votedPosts.filter((vote) => !vote.post || !vote.post.equals(id));
                await post.save();
                await user.save();
                console.log('Undo upvote successful');
                res.status(200).json(post);
            } else {
                throw new Error('User did not upvote this post');
            }
        } else {
            throw new Error('User did not upvote this post');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// undo downvote
const undo_downvote = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('This post does not exist');
    }

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new Error('This post does not exist');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingVote = user.votedPosts.find((vote) => vote.post && vote.post.equals(id));

        if (existingVote) {
            if (existingVote.vote === 'downvote') {
                post.downVote--;
                user.votedPosts = user.votedPosts.filter((vote) => !vote.post || !vote.post.equals(id));
                await post.save();
                await user.save();
                console.log('Undo downvote successful');
                res.status(200).json(post);
            } else {
                throw new Error('User did not downvote this post');
            }
        } else {
            throw new Error('User did not downvote this post');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


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
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (!post.replies.includes(commentId)) {
            return res.status(404).json({ error: 'Comment not found for this post' });
        }

        post.replies = post.replies.filter(replyId => !replyId.equals(commentId));
        const comment = await Comment.findOneAndDelete({ commentId })

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
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        comment.body = req.body.body || comment.body;

        await comment.save();

        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

//UPVOTE comment
const upvote_comment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new Error('Invalid comment ID');
    }

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingVote = user.votedComments.find((vote) => vote.comment && vote.comment.equals(commentId));

        if (existingVote) {
            if (existingVote.vote === 'upvote') {
                throw new Error('User already upvoted this comment');
            } else {
                comment.upVote++;
                comment.downVote--;
                existingVote.vote = 'upvote';
            }
        } else {
            comment.upVote++;
            user.votedComments.push({ comment: commentId, vote: 'upvote' });
        }

        await comment.save();
        await user.save();

        console.log('Comment updated successfully:', comment);
        console.log('User after upvoting comment:', user);

        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


//DOWNVOTE comment
const downvote_comment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new Error('Invalid comment ID');
    }

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingVote = user.votedComments.find((vote) => vote.comment && vote.comment.equals(commentId));

        if (existingVote) {
            if (existingVote.vote === 'downvote') {
                throw new Error('User already downvoted this comment');
            } else {
                comment.downVote++;
                comment.upVote--;
                existingVote.vote = 'downvote';
            }
        } else {
            comment.downVote++;
            user.votedComments.push({ comment: commentId, vote: 'downvote' });
        }

        await comment.save();
        await user.save();

        console.log('Comment updated successfully:', comment);
        console.log('User after downvoting comment:', user);

        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

//UNDO upvote_comment
const undo_upvote_comment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new Error('Invalid comment ID');
    }

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingVote = user.votedComments.find((vote) => vote.comment && vote.comment.equals(commentId));

        if (existingVote) {
            if (existingVote.vote === 'upvote') {
                comment.upVote--;
                user.votedComments = user.votedComments.filter((vote) => !vote.comment || !vote.comment.equals(commentId));
                await comment.save();
                await user.save();
                console.log('Undo upvote for comment successful');
                res.status(200).json(comment);
            } else {
                throw new Error('User did not upvote this comment');
            }
        } else {
            throw new Error('User did not upvote this comment');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

//UNDO downvote comment
const undo_downvote_comment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new Error('Invalid comment ID');
    }

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error('Comment not found');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const existingVote = user.votedComments.find((vote) => vote.comment && vote.comment.equals(commentId));

        if (existingVote) {
            if (existingVote.vote === 'downvote') {
                comment.downVote--;
                user.votedComments = user.votedComments.filter((vote) => !vote.comment || !vote.comment.equals(commentId));
                await comment.save();
                await user.save();
                console.log('Undo downvote for comment successful');
                res.status(200).json(comment);
            } else {
                throw new Error('User did not downvote this comment');
            }
        } else {
            throw new Error('User did not downvote this comment');
        }
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
        const keywordArray = keywords.split(' ');

        const regexPattern = keywordArray.map(keyword => `(?=.*\\b${keyword}\\b)`).join('');

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

//GET comments by user
const get_comments_user = async (req, res) => {
    const { username } = req.params

    const comments = await Comment.find({ "username": username }).select({})

    if (!comments) {
        return res.status(404).json({ error: 'There are no comments!' })
    }
    res.status(200).json(comments)
}

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
    search_post,
    upvote,
    downvote,
    upvote_comment,
    downvote_comment,
    undo_upvote,
    undo_downvote,
    undo_upvote_comment,
    undo_downvote_comment,
    get_comments_user
}