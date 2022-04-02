const User = require('../models/User');
const FriendGroup = require('../models/FriendsGroup');
const Post = require('../models/Post');

module.exports = class FilterRep {

    async filterByGroupNamesFromBody(body) {
        return await this.filterByGroupNames(body.groupNames);
    }
    async filterByDateFromBody(body) {
        return await this.filterByDate(body.friends, body.from, body.to);
    }
    async filterByTaggedUserFromBody(body) {
        return await this.filterBytaggedUser(body.friends, body.userNameTags);
    }
    async filterByTagsFromBody(body) {
        return await this.filterByTags(body.friends, body.tags);
    }
    async filterByAllFromBody(body) {
        return await this.filterByAll(
            body.friends,
            body.from,
            body.to,
            body.tags,
            body.groupNames,
            body.userNameTags);
    }

    async filterByGroupNames(groupNames) {
        let groups = await FriendGroup.find({ _id: { $in: groupNames } });
        let userArr = [];
        for (let group of groups) {
            userArr = [...userArr, ...group.users_id];
        }
        let whatFound = await Post.find({
            user: { $in: userArr }
        });
        return whatFound;
    }

    async filterByDate(friends, from, to) {
        let whatFound = await Post.find({
            user: { $in: friends },
            time_posted: {
                $gt: from,
                $lt: to
            }
        })
        return whatFound;
    }

    async filterBytaggedUser(friends, userNameTags) {
        let users = await User.find({ user_display: { $in: userNameTags } });
        let usersId = users.map((user) => user._id)
        let whatFound = await Post.find({
            user: { $in: friends },
            user_tags: {
                $in: usersId
            }
        });
        console.log(whatFound);
        return whatFound;
    }

    async filterByTags(friends, tags) {
        let whatFound = await Post.find({
            user: { $in: friends },
            tags: {
                $in: tags
            }
        });
        return whatFound;
    }
    async filterByAll(friends, from,
        to, tags,
        groupNames, userNameTags) {
        let groups = await FriendGroup.find({ _id: { $in: groupNames } });
        let userArr = friends;
        for (let group of groups) {
            userArr = [...userArr, ...group.users_id];
        }
        let users = await User.find({ user_display: { $in: userNameTags } });
        let usersId = users.map((user) => user._id)
        let whatFound = await Post.find({
            user: { $in: userArr },
            tags: {
                $in: tags
            },
            user_tags: {
                $in: usersId
            },
            time_posted: {
                $gt: from,
                $lt: to
            }
        });
        return whatFound;
    }
}