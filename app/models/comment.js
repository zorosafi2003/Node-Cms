const mongoose = require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId ;
const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});


module.exports = mongoose.model('comment', commentSchema)