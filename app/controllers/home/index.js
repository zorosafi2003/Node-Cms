const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports.getHome = (req, res, next) => {
  Post.find().sort({ createdAt: -1 }).exec().then(postArr => {
    res.render("home/index", { posts: postArr });
  }).catch(err => {
    next(err);
  })
};

module.exports.getAbout = (req, res, next) => {
  res.render("home/about");
};

module.exports.getPostById = (req, res, next) => {
  let postId = req.params.id;
  Post.findById(postId).then(post=>{
    res.render("home/post",{post});
  })
};
