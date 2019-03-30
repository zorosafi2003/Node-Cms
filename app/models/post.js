const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    status:{
        type:String,
        required:true,
        default:'public'
    },
    allowComments:{
        type:Boolean
    },
    body:{
        type:String
    },
    file:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('post',postSchema);