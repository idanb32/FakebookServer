const FriendGroup = require('../models/FriendsGroup');

module.exports = class FriendsGroupRep {
    async createFriendsGroupFromBody(body) {
        return await this.createFriendsGroup(body.groupName, body.usersId);
    }

    async deleteFriendsGroupFromBody(body) {
        await this.deleteFriendsGroup(body.groupId)
    }

    async editFriendGroupFromBody(body) {
        await this.editFriendGroup(body.groupId, body.groupName, body.usersId)
    }

    async getAllFriendGroups(){
        return await FriendGroup.find();
    }

    async getFriendGroup(groupId){
        let group = await FriendGroup.findById(groupId);
        return group;
    }

    async createFriendsGroup(groupName, usersId) {
        let newGroup = new FriendGroup({
            name: groupName,
            //users_id: usersId
        });
        await newGroup.save();
    }

    async deleteFriendsGroup(groupId) {
        await FriendGroup.deleteOne({ _id: groupId });
    }

    async editFriendGroup(groupId, groupName, usersId) {
        await FriendGroup.UpdateOne(
            { _id: groupId }, { users_Id: usersId }, { name: groupName })
    }
}