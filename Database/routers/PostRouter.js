const express = require('express');
const router = express.Router();

const container = require('../repContainer');
const rep = container.resolve('PostRep');

router.post('/Add', async (req, res) => {
    await rep.addPostBody(req.body);
    res.send("Post has been added");
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

router.post('/GetByUserId', async (req, res) => {
    let posts = await rep.getPostOfUserBody(req.body);
    res.send(posts);
})

router.get('/GetAll', async (req, res) => {
    let posts = await rep.getPosts();
    res.send(posts);
})

module.exports = router;