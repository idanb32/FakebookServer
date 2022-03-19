const Post = require('../models/Post');

module.exports = class PostRep {

    async addPostBody(body) {
        await this.addPost(body.img, body.location, body.userId, body.text)
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

    async getPostByUser(userId) {
        let posts = await Post.find({ user: userId });
        return posts;
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

    async getPost(postId) {
        return await Post.findById(postId);
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