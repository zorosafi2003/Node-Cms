const mongoose = require('mongoose');
const Post = mongoose.model('post');
const uploadHelper= require('../../helpers/upload-helpers');
const fs = require('fs');

module.exports.getPosts = (req, res, next) => {
    Post.find().sort({createdAt:-1}).exec().then(postArr => {
        res.render('admin/posts/index', { posts: postArr ,...req.flash() });
    }).catch(err => {
        next(err);
    });
}

module.exports.getCreatePost = (req, res, next) => {
    res.render('admin/posts/create')
}

module.exports.CreatePost = (req, res, next) => {
    if(!uploadHelper.isEmpty(req.files))
    {
        let file = req.files.file;
        let fileName =Date.now()+'-' +file.name;

        file.mv(uploadHelper.uploadDir +fileName,(err)=>{
            if(err)
            {next(err);}
        }) ;
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
    Post.findById(postId).then((post)=>{
        fs.unlink(uploadHelper+post.file,(err)=>{
            post.remove();
            req.flash('successMessage','Post was Deleted successfully');
            res.redirect('/admin/posts')
        })
    }).catch(err => {
        next(err);
    });
}
