const container = require('../containerConfig');
const mongoose = container.resolve("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    user_name:{
        type: String,
        index: { unique: true, sparse: true }
    },
    user_display:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    image_url:{
        type:String
    },
    google_account:{
        type:String,
        index: { unique: true, sparse: true }
    },
    facebook_account:{
        type:String,
        index: { unique: true, sparse: true }
    },
    friends:[{
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
    friend_groups:[{
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'FriendGroup'
    }],
    posts:[{
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }],
    bloack_list:[{
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;