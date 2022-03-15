const express = require('express');
const router = express.Router();

const container = require('../repContainer');
const rep = container.resolve('CommentRep');


router.post('/Add', async (req, res) => {
    await rep.addCommentFromBody(req.body);
    res.send('Comment has been added');
});
router.post('/Delete', async (req, res) => {
    await rep.deleteCommentFromBody(req.body);
    res.send('Comment has been deleted');
});
router.post('/Get', async (req, res) => {
    let company = await rep.getCommentFromBody(req.body);
    res.send(company);
});
router.get('/GetAll', async (req, res) => {
    let allCompany = await rep.getAllComments();
    res.send(allCompany);
});
router.post('/Update', async (req, res) => {
    await rep.editCommentFromBody(req.body);
    res.send('Comment has been updated');
});


module.exports = router;