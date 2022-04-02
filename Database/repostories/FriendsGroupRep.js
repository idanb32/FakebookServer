const FriendGroup = require('../models/FriendsGroup');
const User = require('../models/User');

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

    async getAllFriendGroups() {
        return await FriendGroup.find();
    }

    async getFriendGroup(groupId) {
        let group = await FriendGroup.findById(groupId);
        return group;
    }

    async getFriendsGroupNameFromBody(body) {
        return await this.getFriendsGroupName(body.groupId)
    }

    async createFriendsGroup(groupName, usersId) {
        let newGroup = new FriendGroup({
            name: groupName,
            users_id: usersId
        });
        for (let user of usersId) {
            console.log(newGroup._id);
            await User.updateOne({ _id: user },
                { $push: { friend_groups: newGroup._id } });
        }
        await newGroup.save();
        return newGroup._id;
    }

    async deleteFriendsGroup(groupId) {
        await FriendGroup.deleteOne({ _id: groupId });
    }

    async editFriendGroup(groupId, groupName, usersId) {
        await FriendGroup.UpdateOne(
            { _id: groupId }, { users_Id: usersId }, { name: groupName })
    }

    async getFriendsGroupName(groupsId) {
        let arr = []
        for (let groupId of groupsId) {
            let friendGroup = await FriendGroup.findById(groupId);
            if (friendGroup != null && friendGroup != undefined) {
                let pushMe = {
                    id: friendGroup._id,
                    name: friendGroup.name
                }
                arr.push(pushMe);
            }
        }
        return arr;
    }


}