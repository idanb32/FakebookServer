const express = require('express');
const router = express.Router();

const container = require('../containerConfig');
const multer = container.resolve('multer');
const axios = container.resolve('axios');
const config = container.resolve('config');
const dbPort = config.get('database.port');

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

router.post('/upload', multer.single("file"), async (req, res) => {
    const file = req.file;
    const fileName = Math.floor(Math.random() * 1000000) + file.originalName;
    await pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../images/${fileName}`)
    );
    let fullPath = `Server/Gateway/images/${fileName}`;
    res.send(fullPath);
})

router.post('/uploadForSignUp', multer.single("file"), async (req, res) => {
    const file = req.file;
    const fileName = Math.floor(Math.random() * 1000000) + file.originalName;
    await pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../images/${fileName}`)
    );
    let fullPath = `Server/Gateway/images/${fileName}`;
    console.log(dbPort + "/User/UpdateImg");
    let axiosRes = await axios.post(dbPort + "/User/UpdateImg",
        {
            username: req.body.username,
            imgUrl: fullPath
        })
    res.send(axiosRes.data);
})

module.exports = router;