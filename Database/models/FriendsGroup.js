const { stringify } = require('yamljs');
const container = require('../containerConfig');
const mongoose = container.resolve("mongoose");
const Schema = mongoose.Schema;

const friendGroupSchema = new Schema({
    users_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    name: {
        type: String,
    }
});

const FriendGroup = mongoose.model('FriendGroup', friendGroupSchema);
module.exports = FriendGroup;