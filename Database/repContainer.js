const container = require('./containerConfig');
const awilix = require('awilix');
const commentRep = require('./repostories/CommentsRep');
const UserRep = require('./repostories/UserRep');
const PostRep = require('./repostories/PostRep');
const FriendsGroupRep = require('./repostories/FriendsGroupRep');


container.register({
    CommentRep: awilix.asClass(commentRep).singleton(),
    UserRep: awilix.asClass(UserRep).singleton(),
    PostRep: awilix.asClass(PostRep).singleton(),
    FriendsGroupRep: awilix.asClass(FriendsGroupRep).singleton()
});
module.exports = container;