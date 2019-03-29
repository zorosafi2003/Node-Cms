const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports.getPosts = (req,res,next)=>{
    res.render('admin/posts/index')
}

module.exports.getCreatePost = (req,res,next)=>{
    res.render('admin/posts/create')
}

module.exports.CreatePost = (req,res,next)=>{
    if(req.body.allowComments){
        req.body.allowComments = true;
    }else{
        req.body.allowComments = false;
    }
   Post.create(req.body).then(post=>{
       console.log(post);
       res.redirect('/admin/posts')
   }).catch(err=>{
       next(err);
   })
}
