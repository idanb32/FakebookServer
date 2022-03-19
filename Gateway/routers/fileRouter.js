const express = require('express');
const router = express.Router();

const container = require('../containerConfig');
const multer = container.resolve('multer')

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

router.post('/upload', multer.single("file"), async (req, res) => {
    const file = req.file;
    const fileName =Math.floor(Math.random() * 1000000) + file.originalName;
    await pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../images/${fileName}`)
    );
    let fullPath = `Server/Gateway/images/${fileName}`;
    res.send(fullPath);
})


module.exports = router;