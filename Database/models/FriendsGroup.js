const { stringify } = require('yamljs');
const container = require('../containerConfig');
const mongoose = container.resolve("mongoose");
const Schema = mongoose.Schema;

const friendGroupSchema = new Schema({
    users_id: [{
        type: mongoose.Schema.Types.ObjectId,
        //require: [true, 'You must add at least one friend'],//not sure yet
        ref: 'User'
    }],
    name: {
        type: String,
        index: { unique: true, sparse: true }
    }
});

const FriendGroup = mongoose.model('FriendGroup', friendGroupSchema);
module.exports = FriendGroup;