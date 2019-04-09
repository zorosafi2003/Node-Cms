const mongoose = require('mongoose');
const Comment = mongoose.model('comment');
const Post = mongoose.model('post');

module.exports.getComments = (req, res, next) => {
    Comment.find().populate('user').sort({ createdAt: -1 }).exec().then(commentArr => {
        res.render('admin/comments/index', { comments: commentArr });
    });
}

module.exports.postComment = (req, res, next) => {
    Post.findById(req.body.postId).then(post => {

        const comment = new Comment({
            user: req.user.id,
            body: req.body.body
        });

        post.comments.push(comment);
        post.save().then(() => {
            comment.save().then(() => {
                res.redirect('/post/' + post.id)
            })
        })
    })
}

module.exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id;
    Comment.findById(commentId).then((comment) => {
        comment.remove();
        res.redirect('/admin/comments')
    })
}