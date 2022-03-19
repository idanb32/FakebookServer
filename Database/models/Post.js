const container = require('../containerConfig');
const mongoose = container.resolve("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    image_url: {
        type: String
    },
    location: {
        type: Object
    },
    time_posted: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: String
    }],
    user_tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    text: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});


const Post = mongoose.model('Post', postSchema);
module.exports = Post;