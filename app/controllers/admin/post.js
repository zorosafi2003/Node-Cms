const mongoose = require('mongoose');
const Post = mongoose.model('post');
const Category = mongoose.model('category');

const uploadHelper = require('../../helpers/upload-helpers');
const fs = require('fs');
const { validationResult } = require('express-validator/check');

module.exports.getPosts = (req, res, next) => {
    Post.find().sort({ createdAt: -1 }).exec().then(postArr => {
        res.render('admin/posts/index', { posts: postArr, ...req.flash() });
    }).catch(err => {
        next(err);
    });
}

module.exports.getCreatePost = (req, res, next) => {
    Category.find().then(categoryArr => {
        res.render('admin/posts/create', {
            isEdit: false,
            categories: categoryArr
        });
    });
}

module.exports.CreatePost = (req, res, next) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/posts/create'
            , {
                errors: errors.array(),
                post: req.body,
                isEdit: false
            });
    }

    if (!uploadHelper.isEmpty(req.files)) {
        let file = req.files.file;
        let fileName = Date.now() + '-' + file.name;

        file.mv(uploadHelper.uploadDir + fileName, (err) => {
            if (err) { next(err); }
        });
        req.body.file = fileName;
    }


    if (req.body.allowComments) {
        req.body.allowComments = true;
    } else {
        req.body.allowComments = false;
    }

    Post.create(req.body).then(post => {
        res.redirect('/admin/posts');
    }).catch(err => {
        next(err);
    })
}

module.exports.getEditPost = (req, res, next) => {
    let postId = req.params.id;
    Post.findById(postId).then(post => {
        Category.find().then(categoryArr => {
            res.render('admin/posts/create', { post, isEdit: true, categories: categoryArr });
        });
    }).catch(err => {
        next(err);
    });
}

module.exports.editPost = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/posts/create'
            , {
                errors: errors.array(),
                post: req.body,
                isEdit: true
            });
    }

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
        post.category = req.body.category;
        return post.save()
    }).then(() => {
        res.redirect('/admin/posts')
    }).catch(err => {
        next(err);
    });
}

module.exports.deletePost = (req, res, next) => {
    let postId = req.params.id;
    Post.findById(postId).populate('comments').exec().then((post) => {
        fs.unlink(uploadHelper + post.file, (err) => {
            console.log( post.comments);
            post.comments.forEach(comment => {
                comment.remove();
            });
            post.remove().then(()=>{
                req.flash('successMessage', 'Post was Deleted successfully');
                res.redirect('/admin/posts');
            });
          
        })
    }).catch(err => {
        next(err);
    });
}
