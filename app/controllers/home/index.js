const mongoose = require('mongoose');
const Post = mongoose.model('post');
const Category = mongoose.model('category');

module.exports.getHome = (req, res, next) => {
  Post.find().sort({ createdAt: -1 }).exec().then(postArr => {
    Category.find().then(categoryArr=>{
      res.render("home/index", { posts: postArr , categories :categoryArr});
    })
  }).catch(err => {
    next(err);
  })
};

module.exports.getAbout = (req, res, next) => {
  res.render("home/about");
};

module.exports.getPostById = (req, res, next) => {
  let postId = req.params.id;
  Post.findById(postId).populate({path:'comments',populate:{path:'user'}}).exec().then(post=>{
    res.render("home/post",{post});
  })
};
