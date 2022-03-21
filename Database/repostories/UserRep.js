const User = require('../models/User');
// const FriendGroup = require('../models/FriendGroup');
const Post = require('../models/Post');


module.exports = class UserRep {

    async addUserViaGoogleBody(body) {
        return await this.addUserViaGoogle(body.googleId,
            body.userDisplay,
            body.imgurl,
            body.email);
    }

    async addUserViaFacebookBody(body) {
        return await this.addUserViaFacebook(body.facebookId,
            body.userDisplay,
            body.imgurl,
            body.email);
    }

    async addUserViaUserPassBody(body) {
        return await this.addUserViaUserPass(body.userName,
            body.password,
            body.userDisplay,
            body.imgurl,
            body.email);
    }

    async updatePasswordBody(body) {
        await this.updatePassword(body.username, body.password);
    }

    async updateUrlBody(body){
        await this.updateUrl(body.username, body.imgUrl);
    }


    async getUserBody(body) {
        return await this.getUser(body.id);
    }

    async getUserViaUsernameBody(body) {
        return await this.getUserViaUsername(body.username);
    }
    async GetOrCreateFacebookBody(body) {
        return await this.GetOrCreateFacebook(body.facebookId,
            body.userDisplay,
            body.imgurl,
            body.email);
    }

    async GetOrCreateGoogleBody(body) {
        return await this.GetOrCreateGoogle(body.googleId,
            body.userDisplay,
            body.imgurl,
            body.email);
    }


    async getFriendsBody(body) {
        return await this.getFriends(body.id);
    }

    async getFriendsGroupsBody(body) {
        return await this.getFriendsGroups(body.id);
    }

    async addFriendBody(body) {
        await this.addFriend(body.id, body.friendId);
    }

    async removeFriendBody(body) {
        await this.removeFriend(body.id, body.friendId);
    }

    async addPostBody(body) {
        await this.addPost(body.id, body.postId);
    }

    async blockUserBody(body) {
        await this.blockUser(body.id, body.blockedId)
    }

    async addUserViaUserPass(username, password, userDisplay, imgurl, email) {
        let newUser = new User({
            user_name: username,
            user_display: userDisplay,
            password: password,
            image_url: imgurl,
            email: email
        });
        try {
            await newUser.save();
            return newUser;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    async addUserViaFacebook(facebookId, userDisplay, imgurl, email) {
        let newUser = new User({
            facebook_account: facebookId,
            user_display: userDisplay,
            image_url: imgurl,
            email: email
        });
        try {
            await newUser.save();
            return newUser;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    async addUserViaGoogle(googleid, userDisplay, imgurl, email) {
        try {
            let newUser = new User({
                google_account: googleid,
                user_display: userDisplay,
                image_url: imgurl,
                email: email
            });
            await newUser.save();
            return newUser;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    async GetOrCreateFacebook(facebookId, userDisplay, imgurl, email) {
        let user = await User.findOne({ facebook_account: facebookId });
        if (user) return user;
        let newUser = await this.addUserViaFacebook(facebookId, userDisplay, imgurl, email);
        return newUser;
    }

    async GetOrCreateGoogle(googleId, userDisplay, imgurl, email) {
        let user = await User.findOne({ google_account: googleId });
        if (user) return user;
        let newUser = await this.addUserViaGoogle(googleId, userDisplay, imgurl, email);
        return newUser;
    }

    async updatePassword(userName, newPassword) {
        await User.updateOne({ user_name: userName }, {
            password: newPassword
        });
    }

    async updateUrl(username,imgUrl){
        console.log(username,imgUrl);
        await User.updateOne({ user_name: username }, {
            image_url: imgUrl
        });
    }

    async getUser(id) {
        let user = await User.findById(id);
        return user;
    }
    async getUserViaUsername(username) {
        let user = await User.findOne({ user_name: username });
        if (user) return user;
        return false;
    }

    async getFriends(id) {
        let user = await this.getUser(id);
        let friends = [];
        for (let friendId of user.friends) {
            let friend = await User.findById(friendId);
            friends.push(friend);
        }
        return friends;
    }

    // async getFriendsGroups(id){
    //     let user = await this.getUser(id);
    //     let friendsGroups =[];
    //     for(let friendGroupId of user.friend_groups){
    //         let friendGroup = await FriendGroup.findById(friendGroupId);
    //         friendsGroups.push(friendGroup);
    //     }
    //     return friendsGroups;
    // }

    async addFriend(id, friendId) {
        let user = await this.getUser(id);
        let friends = user.friends;
        let indexOfFriendRemoved = friends.indexOf(friendId);
        if (indexOfFriendRemoved !== -1) return
        friends.push(friendId);
        await User.updateOne({ _id: id }, {
            friends: friends
        });
    }

    async removeFriend(id, friendId) {
        let user = await this.getUser(id);
        let friends = user.friends;
        let indexOfFriendRemoved = friends.indexOf(friendId);
        console.log(indexOfFriendRemoved)
        if (indexOfFriendRemoved == -1) return
        friends.splice(indexOfFriendRemoved, 1);
        await User.updateOne({ _id: id }, {
            friends: friends
        });
    }

    async getPosts(id) {
        let user = await this.getUser(id);
        let posts = [];
        for (let postId of user.posts) {
            let post = await Post.findById(postId);
            posts.push(post);
        }
        return posts;
    }

    async getBlockList(id) {
        let user = await this.getUser(id);
        let BlockList = [];
        for (let userId of user.bloack_list) {
            let blockedUser = await User.findById(userId);
            BlockList.push(blockedUser);
        }
        return BlockList;
    }

    async addPost(userId, postId) {
        let posts = await this.getPosts(postId);
        posts.push(postId);
        await User.updateOne({ _id: userId }, {
            posts: posts
        });
    }

    async blockUser(userId, blockMe) {
        let blocked = await this.getBlockList(userId);
        blocked.push(blockMe);
        await User.updateOne({ _id: userId }, {
            bloack_list: blocked
        });
    }

}