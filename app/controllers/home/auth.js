const mongoose = require('mongoose');
const User = mongoose.model('user');
const { validationResult } = require('express-validator/check');
const passport = require('passport');

module.exports.getLogin = (req, res, next) => {
  res.render("home/login");
};

module.exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      return res.status(400).send(info);
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      res.redirect("/admin");
    });

  })(req, res, next);
}

module.exports.logout = (req,res,next)=>{
  req.logout();
  res.redirect('/auth/login');
}

module.exports.getRegister = (req, res, next) => {
  res.render("home/register");
};

module.exports.PostRegister = (req, res, next) => {

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('home/register'
      , {
        errors: errors.array(),
        user: req.body,
      });
  }
  User.create(req.body).then((user) => {
    res.redirect("/admin");
  })
};
