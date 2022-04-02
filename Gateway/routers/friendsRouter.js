const express = require('express');
const router = express.Router();

const container = require('../containerConfig');
const config = container.resolve('config');
const axios = container.resolve('axios');
const port = config.get('friends.port');

router.post('/GetFriends', async (req, res) => {
    console.log('in get friends');
    console.log(req.body);
    let resault = await axios.post(port + "/GetFriends", req.body);
    let data = resault.data;
    console.log(data);
    res.send(data);
})

router.post('/GetPostsOfFriends', async (req, res) => {
    let resault = await axios.post(port + '/GetPostsOfFriends', req.body);
    let data = resault.data;
    res.send(data);
})

router.post('/AddLikeAndComment', async (req, res) => {
    let resault = await axios.post(port + '/AddLikeAndComment', req.body);
    let data = resault.data;
    res.send(data);
})

router.post('/GetAllNonFriendsUsers', async (req, res) => {
    let resault = await axios.post(port + '/GetAllNonFriendsUsers', req.body);
    res.send(resault.data);
});

router.post('/GetAllFriendsName', async (req, res) => {
    let resault = await axios.post(port + '/GetAllFriendsName', req.body);
    res.send(resault.data);
});

router.post('/AddFriend', async (req, res) => {
    let resault = await axios.post(port + '/AddFriend', req.body);
    res.send(resault.data);
});

router.post('/AddFriendsGroup', async (req, res) => {
    let resault = await axios.post(port + '/AddFriendsGroup', req.body);
    console.log(resault.data);
    res.send(resault.data);
});
router.post('/getFriendsGroupName', async (req, res) => {
    console.log('get friends group name');
    let resault = await axios.post(port + '/getFriendsGroupName', req.body);
    console.log(resault.data);
    res.send(resault.data);
});

router.post('/GetMyPosts' , async (req, res) =>{
    let resault = await axios.post(port + '/GetMyPosts', req.body);
    console.log(resault.data);
    res.send(resault.data);
});



module.exports = router;