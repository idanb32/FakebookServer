const express = require('express');
const router = express.Router();

const container = require('../repContainer');
const rep = container.resolve('FilterRep');



router.post('/filterByGroupNames', async (req, res) => {
    let serverRes = await rep.filterByGroupNamesFromBody(req.body);
    res.send(serverRes);
});

router.post('/filterByDate', async (req, res) => {
    let serverRes = await rep.filterByDateFromBody(req.body);
    res.send(serverRes);
});

router.post('/filterByTaggedUser', async (req, res) => {
    let serverRes = await rep.filterByTaggedUserFromBody(req.body);
    res.send(serverRes);
});

router.post('/filterByTags', async (req, res) => {
    let serverRes = await rep.filterByTagsFromBody(req.body);
    res.send(serverRes);
});

router.post('/filterByAll', async (req, res) => {
    let serverRes = await rep.filterByAllFromBody(req.body);
    res.send(serverRes);
});

module.exports = router;