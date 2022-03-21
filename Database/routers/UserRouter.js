const express = require('express');
const router = express.Router();

const container = require('../repContainer');
const rep = container.resolve('UserRep');

router.post('/Add', async (req, res) => {
    let didAUserWasAdded = true;
    if (req.body.hasOwnProperty('googleId')) {
        didAUserWasAdded = await rep.addUserViaGoogleBody(req.body);
    }
    else if (req.body.hasOwnProperty('facebookId')) {
        didAUserWasAdded = await rep.addUserViaFacebookBody(req.body);
    }
    else {
        didAUserWasAdded = await rep.addUserViaUserPassBody(req.body);
    }
    res.send(didAUserWasAdded);
});

router.post('/UpdatePassword', async (req, res) => {
    await rep.updatePasswordBody(req.body);
    res.send(`password has been updated`);
})

router.post('/UpdateImg', async (req, res) => {
    console.log('got into updateImg')
    await rep.updateUrlBody(req.body);
    res.send(`password has been updated`);
})

router.post('/GetFriends', async (req, res) => {
    let friends = await rep.getFriendsBody(req.body);
    res.send(friends);
})

router.post('/GetFriendGroups', async (req, res) => {
    let friends = await rep.getFriendsGroupsBody(req.body);
    res.send(friends);
})

router.post('/Get', async (req, res) => {
    let user = await rep.getUserBody(req.body);
    res.send(user);
})

router.post('/GetByName', async (req, res) => {
    let user = await rep.getUserViaUsernameBody(req.body);
    res.send(user);
})

router.post('/GetOrCreateGoogle', async (req, res) => {
    let user = await rep.GetOrCreateGoogleBody(req.body);
    res.send(user);
})

router.post('/GetOrCreateFacebook', async (req, res) => {
    let user = await rep.GetOrCreateFacebookBody(req.body);
    res.send(user);
})

router.post('/AddFriend', async (req, res) => {
    await rep.addFriendBody(req.body);
    res.send('friend has been added');
})

router.post('/RemoveFriend', async (req, res) => {
    await rep.removeFriendBody(req.body);
    res.send('friend has been removed');
})

router.post('/BlockUser', async (req, res) => {
    await rep.blockUserBody(req.body);
    res.send('friend has been blocked');
})




module.exports = router;