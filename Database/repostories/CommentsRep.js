const Comment = require('../models/Comments');

module.exports = class CommentsRep {

    async addCommentFromBody(body) {
        return await this.addComment(body.text, body.userId, body.postId);
    }

    async editCommentFromBody(body) {
        await this.editComment(body.text, body.commentId);
    }

    async deleteCommentFromBody(body) {
        await this.deleteComment(body.commentId);
    }

    async getCommentFromBody(body) {
        let comment = await this.getComment(body.commentId);
        return comment;
    }

    async getAllComments() {
        return await Comment.find();
    }

    async getComment(commentId) {
        let comment = await Comment.findById(commentId);
        return comment;
    }

    async editComment(text, commentId) {
        await Comment.updateOne({ _id: commentId }, {
            text: text
        });
    }

    async deleteComment(commentId) {
        await Comment.deleteOne({ _id: commentId });
    }

    async addComment(text, userId, postId) {
        let currentTime = new Date();
        let newComment = new Comment({
            text: text,
            user_id: userId,
            time_sent: currentTime,
            post_id: postId
        });
        await newComment.save();
        return newComment._id;
    }
}