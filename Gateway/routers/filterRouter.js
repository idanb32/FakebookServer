const express = require('express');
const router = express.Router();

const container = require('../containerConfig');
const config = container.resolve('config');
const axios = container.resolve('axios');
const port = config.get('filter.port');

console.log(port);

router.post('/filterByGroupNames', async (req, res) => {
    let serverRes = await axios.post(port + '/filterByGroupNames', req.body);
    res.send(serverRes.data);
});

router.post('/filterByDate', async (req, res) => {
    console.log('in filter by date');
    console.log(port + '/filterByDate');
    let serverRes = await axios.post(port + '/filterByDate', req.body);
    res.send(serverRes.data);
});

router.post('/filterByTaggedUser', async (req, res) => {
    let serverRes = await axios.post(port + '/filterByTaggedUser', req.body);
    res.send(serverRes.data);
});

router.post('/filterByTags', async (req, res) => {
    let serverRes = await axios.post(port + '/filterByTags', req.body);
    res.send(serverRes.data);
});

router.post('/filterByAll', async (req, res) => {
    let serverRes = await axios.post(port + '/filterByAll', req.body);
    res.send(serverRes.data);
});

router.post('/UpdatePost', async (req, res) => {
    let serverRes = await axios.post(port + '/UpdatePost', req.body);
    res.send(serverRes.data);
})



module.exports = router;