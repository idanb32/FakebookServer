const express = require('express');
const router = express.Router();

const container = require('../repContainer');
const rep = container.resolve('PostRep');

router.post('/Add', async (req, res) => {
    await rep.addPostBody(req.body);
    res.send("Post has been added");
})

router.post('/AddFull', async (req, res) => {
    let postId = await rep.addPostFullBody(req.body);
    res.send(postId);
})

router.post('/AddTags', async (req, res) => {
    await rep.addTagsBody(req.body);
    res.send("Added tags to a post");
})

router.post('/AddTaggedUser', async (req, res) => {
    await rep.addTagedUsersBody(req.body);
    res.send("Added taged user");
})

router.post('/Like', async (req, res) => {
    await rep.addLikeBody(req.body);
    res.send("Liked post");
})

router.post('/AddComment', async (req, res) => {
    await rep.addCommentBody(req.body);
    res.send("Commented post");
})

router.post('/Get', async (req, res) => {
    let post = await rep.getPostBody(req.body);
    res.send(post);
})

router.post('/GetFriendsPost', async (req, res) => {
    let friendsPosts = await rep.getPostsOfFriendsBody(req.body);
    res.send(friendsPosts);
})

router.post('/GetByUserId', async (req, res) => {
    let posts = await rep.getPostOfUserBody(req.body);
    res.send(posts);
})

router.post('/AddLikeAndComment', async (req, res) => {
    let respond = await rep.AddLikeAndCommentFromBody(req.body);
    res.send(respond);
})

router.get('/GetAll', async (req, res) => {
    let posts = await rep.getPosts();
    res.send(posts);
})
router.post('/GetMyPosts', async (req, res) => {
    let posts = await rep.getPostOfUserBody(req.body);
    res.send(posts);
})

router.post('/UpdatePost' ,async(req,res)=>{
    console.log('got to db update');
    let post = await rep.UpdateMyPostFromBody(req.body);
    res.send(post);
})


module.exports = router;