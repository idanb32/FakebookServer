const container = require('../containerConfig');
const mongoose = container.resolve("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    text : {
        type: String,
        require: [true,'You must insert a comment to comment'] 
    },
    user_id : {
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    time_sent: {
        type: Date
    },
    post_id:{
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }

});

const Comment = mongoose.model('Comment' , commentsSchema);
module.exports = Comment;