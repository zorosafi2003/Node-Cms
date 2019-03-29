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
    }
});

module.exports = mongoose.model('post',postSchema);