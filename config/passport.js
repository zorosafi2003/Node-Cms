const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports.init = (app) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    });
    // load strategies
    require('./strategies/local').init();
}