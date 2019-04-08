const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(10).then(salt => {
            bcrypt.hash(this.password, salt).then(hash => {
                this.password = hash;
                next();
            })
        })
    }
});

userSchema.methods.validatePassword = function(password , callback){
    bcrypt.compare(password,this.password,(err,matched)=>{
        if(err){
            return callback(err);
        }
        if(matched){
            return callback(null,this)
        }
        return callback(err);
    })
}

module.exports = mongoose.model('user', userSchema);