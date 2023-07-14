const Post = require('../models/postsModel');

const post_delete = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/homepage'})
        })
        .catch((err) => {
            console.log(err)
        });
};

module.exports = {
    post_delete
};