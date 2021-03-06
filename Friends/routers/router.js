const express = require('express');
const router = express.Router();

const container = require('../containerConfig');
const axios = container.resolve('axios');
const config = container.resolve('config');
const dbPort = config.get('database.port');

router.post('/GetFriends', async (req, res) => {
    let friends = await axios.post(dbPort + "/User/GetFriends", req.body);
    let friendsFormated = null;
    if (friends.data)
        friendsFormated = friends.data.map((friend) => {
            return {
                id: friend._id,
                name: friend.user_display
            };
        })
    res.send(friendsFormated);
});

router.post('/GetPostsOfFriends', async (req, res) => {
    let friendsPosts = await axios.post(dbPort + "/Post/GetFriendsPost", req.body);
    res.send(friendsPosts.data);
});

router.post('/AddLikeAndComment', async (req, res) => {
    let serverRes = await axios.post(dbPort + "/Post/AddLikeAndComment", req.body);
    res.send(serverRes.data);
});

router.post('/GetAllNonFriendsUsers', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/User/GetAllNonFriendsUsers', req.body);
    res.send(serverRes.data);
});

router.post('/AddFriend', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/User/AddFriend', req.body);
    res.send(serverRes.data);
});

router.post('/AddFriendsGroup', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/FriendGroup/Add', req.body);
    res.send(serverRes.data);
});
router.post('/GetAllFriendsName', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/User/GetAllFriendsName', req.body);
    res.send(serverRes.data);
});
router.post('/GetMyPosts', async (req, res) => {
    console.log('in get my posts');
    let serverRes = await axios.post(dbPort + '/Post/GetMyPosts', req.body);
    res.send(serverRes.data);
});

router.post('/getFriendsGroupName', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/FriendGroup/getFriendsGroupName', req.body);
    console.log(serverRes.data);
    res.send(serverRes.data);
});


module.exports = router;