const express = require('express');
const router = express.Router();
const config = require('../containerConfig');
const dbPort = config.getRegistration('db.port');
const hashPaswords = require('../service/hashPassword');

router.post('/login',async (req,res)=>{

})

router.post('/loginWithGoogle',async (req,res)=>{
    
})

router.post('/loginWithFacebook',async (req,res)=>{
    
})

router.post('/logout',async (req,res)=>{
    
})

module.exports = router;