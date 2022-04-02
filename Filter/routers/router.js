const express = require('express');
const router = express.Router();

const container = require('../containerConfig');
const axios = container.resolve('axios');
const config = container.resolve('config');
const dbPort = config.get('database.port');

router.post('/filterByGroupNames', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/Filter/filterByGroupNames', req.body);
    res.send(serverRes.data);
});

router.post('/filterByDate', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/Filter/filterByDate', req.body);
    res.send(serverRes.data);
});

router.post('/filterByTaggedUser', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/Filter/filterByTaggedUser', req.body);
    res.send(serverRes.data);
});

router.post('/filterByTags', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/Filter/filterByTags', req.body);
    res.send(serverRes.data);
});

router.post('/filterByAll', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/Filter/filterByAll', req.body);
    res.send(serverRes.data);
});

router.post('/UpdatePost', async (req, res) => {
    let serverRes = await axios.post(dbPort + '/Post/UpdatePost', req.body);
    res.send(serverRes.data);
})

module.exports = router;