const container = require('./containerConfig');
const awilix = require('awilix');
const commentRep = require('./repostories/CommentsRep');


container.register({
    CommentRep : awilix.asClass(commentRep).singleton()
});
module.exports = container;