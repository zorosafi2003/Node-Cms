const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../app/models/user');

module.exports.init =()=>{
    passport.use('local',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true 
    },
        (req,email, password, done) => {
            
            User.findOne({email:email}).then(user=>{
                user.validatePassword(password, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            message: 'Invalid email or password.'
                        });
                    }
                    return done(null, user);
                });
            });
        }
    ));
}