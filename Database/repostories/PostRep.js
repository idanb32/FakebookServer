const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comments');

module.exports = class PostRep {

    async addPostBody(body) {
        await this.addPost(body.img, body.location, body.userId, body.text)
    }
    async addPostFullBody(body) {
        let postId = await this.addPostFull(body.img,
            body.location,
            body.userId,
            body.text,
            body.tags,
            body.user_tags
        )
        return postId;
    }
    async addTagsBody(body) {
        await this.addTags(body.postId, body.tags);
    }

    async addTagedUsersBody(body) {
        await this.addTagedUsers(body.postId, body.userId);
    }

    async addLikeBody(body) {
        await this.addLike(body.postId, body.userId);
    }

    async addCommentBody(body) {
        await this.addComment(body.postId, body.commentId);
    }

    async getPostBody(body) {
        return await this.getPost(body.postId);
    }

    async getPostOfUserBody(body) {
        return await this.getPostByUser(body.userId);
    }

    async getPosts() {
        return await Post.find();
    }

    async getPostsOfFriendsBody(body) {
        return await this.getPostsOfFriends(body.userId);
    }

    async AddLikeAndCommentFromBody(body) {
        return await this.AddLikeAndComment(body.userId,
            body.comment,
            body.Like,
            body.postId);
    }

    async getPostByUser(userId) {
        let posts = await Post.find({ user: userId });
        return posts;
    }

    async AddLikeAndComment(userId, comment, like, postId) {
        let postToUpdate = await Post.findById(postId);
        if (comment) {
            let currentTime = new Date();
            let newComment = new Comment({
                text: comment,
                user_id: userId,
                time_sent: currentTime,
                post_id: postId
            });
            await newComment.save();
            postToUpdate.comments.push(newComment._id);
        }
        if (like) {
            if (!postToUpdate.likes.includes(userId)) {
                postToUpdate.likes.push(userId);
            }
        }
        else {
            let index = postToUpdate.likes.indexOf(userId)
            if (index !== -1)
                postToUpdate.likes.splice(index, 1);
        }
        await postToUpdate.save();
        console.log(postToUpdate);
        return postToUpdate;
    }

    async addPost(img, location, userId, text) {
        let timeposted = new Date();
        let newPost = new Post({
            image_url: img,
            location: location,
            time_posted: timeposted,
            user: userId,
            text: text
        });
        await newPost.save();
    }

    async addPostFull(img, location, userId, text, tags, userTags) {
        let timeposted = new Date();
        let newPost = new Post({
            image_url: img,
            location: location,
            time_posted: timeposted,
            user: userId,
            text: text,
            tags: tags,
            user_tags: userTags
        });
        await newPost.save();
        console.log(newPost);
        return newPost;
    }

    async getPost(postId) {
        return await Post.findById(postId);
    }

    async getPostsOfFriends(userId) {
        let user = await User.findById(userId);
        console.log(user);
        let userFriends = user.friends;
        let posts = [];
        for (let position in userFriends) {
            let friendId = userFriends[position];
            let friendPosts = await this.getPostByUser(friendId);
            posts = [...posts, ...friendPosts];
        }
        posts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })
        return posts;
    }

    async addTags(postId, tags) {
        console.log(typeof tags)
        if (typeof tags == "string") {
            let post = await this.getPost(postId);
            if (post.tags != undefined) {
                let newTags = post.tags;
                newTags.push(tags);
                await Post.updateOne({ _id: postId }, {
                    tags: newTags
                });
            }
            else {
                let firstTag = [];
                firstTag.push(tags);
                await Post.updateOne({ _id: postId }, {
                    tags: firstTag
                });
            }
        }
        else {
            await Post.updateOne({ _id: postId }, {
                tags: tags
            });
        }
    }

    async addTagedUsers(postId, userId) {
        if (typeof userId == "string") {
            let post = await this.getPost(postId);
            if (post.user_tags != undefined) {
                let newTags = post.user_tags;
                newTags.push(userId);
                await Post.updateOne({ _id: postId }, {
                    user_tags: newTags
                });
            }
            else {
                let firstTag = [];
                firstTag.push(userId);
                await Post.updateOne({ _id: postId }, {
                    user_tags: firstTag
                });
            }
        }
        else {
            await Post.updateOne({ _id: postId }, {
                user_tags: userId
            });
        }
    }

    async addLike(postId, userId) {
        let post = await this.getPost(postId);
        if (post.likes != undefined) {
            let newLikes = post.likes;
            newLikes.push(userId);
            await Post.updateOne({ _id: postId }, {
                likes: newLikes
            });
        }
        else {
            let firstLike = [];
            firstLike.push(userId);
            await Post.updateOne({ _id: postId }, {
                likes: firstLike
            });
        }
    }

    async addComment(postId, commentId) {
        let post = await this.getPost(postId);
        if (post.hasOwnProperty('comments')) {
            let newComments = post.comments;
            newComments.push(commentId);
            await Post.updateOne({ _id: postId }, {
                comments: newComments
            });
        }
        else {
            let firstComments = [];
            firstComments.push(commentId);
            await Post.updateOne({ _id: postId }, {
                comments: firstComments
            });
        }
    }

}