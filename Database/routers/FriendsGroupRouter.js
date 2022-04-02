const express = require('express');
const router = express.Router();

const container = require('../repContainer');
const rep = container.resolve('FriendsGroupRep');

router.post('/Add',async(req, res) =>{
    let groupId = await rep.createFriendsGroupFromBody(req.body);
    res.send(groupId);
});
router.post('/Delete', async(req, res) => {
    await rep.deleteFriendsGroupFromBody(req.body);
    res.send('Friend group has been deleted');
});

router.post('/Edit', async(req, res) => {
    await rep.editCommentFromBody(req.body);
    res.send('Friend group edited successfully')
})

router.get('/Get', async(req, res) => {
    await rep.getFriendGroup(req.body);
    res.send("Here's your Friend Group you've asked for...")
})

router.get('/Get', async(req, res) => {
    await rep.getFriendGroup(req.body);
    res.send("Here's your Friend Group you've asked for...")
})
router.post('/getFriendsGroupName',async(req, res) =>{
    let data = await rep.getFriendsGroupNameFromBody(req.body);
    res.send(data);
});

module.exports = router;