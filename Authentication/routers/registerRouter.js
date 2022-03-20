const express = require('express');
const router = express.Router();
const config = require('../containerConfig');
const dbPort = config.getRegistration('db.port');
const hashPaswords = require('../service/hashPassword');

router.post('/register',async (req,res)=>{
    
})



module.exports = router;