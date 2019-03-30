const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports.getPosts = (req, res, next) => {
    Post.find().then(postArr => {
        res.render('admin/posts/index', { posts: postArr });
    }).catch(err => {
        next(err);
    });
}

module.exports.getCreatePost = (req, res, next) => {
    res.render('admin/posts/create')
}

module.exports.CreatePost = (req, res, next) => {
    if (req.body.allowComments) {
        req.body.allowComments = true;
    } else {
        req.body.allowComments = false;
    }
    Post.create(req.body).then(post => {
        console.log(post);
        res.redirect('/admin/posts')
    }).catch(err => {
        next(err);
    })
}

module.exports.getEditPost = (req, res, next) => {
    let postId = req.params.id;
    Post.findById(postId).then(post => {
        res.render('admin/posts/edit', { post });
    }).catch(err => {
        next(err);
    });
}

module.exports.editPost = (req, res, next) => {
    let postId = req.params.id;
    if (req.body.allowComments) {
        req.body.allowComments = true;
    } else {
        req.body.allowComments = false;
    }
    Post.findById(postId).then(post => {
        post.title = req.body.title;
        post.status = req.body.status;
        post.allowComments = req.body.allowComments;
        post.body = req.body.body;
        return post.save()
    }).then(()=>{
        res.redirect('/admin/posts')
    }).catch(err => {
        next(err);
    });
}

module.exports.deletePost = (req, res, next) => {
    let postId = req.params.id;
    Post.findOneAndDelete(postId).then(()=>{
        res.redirect('/admin/posts')
    }).catch(err => {
        next(err);
    });
}
