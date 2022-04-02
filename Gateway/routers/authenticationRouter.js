const express = require('express');
const router = express.Router();

const container = require('../containerConfig');
const config = container.resolve('config');
const axios = container.resolve('axios');
const port = config.get('authentication.port');

router.post('/login', async (req,res)=>{
    let resault = await axios.post(port+"/login",req.body);
    let data = resault.data;
    res.send(data);
})

router.post('/loginWithGoogle', async (req,res)=>{
    let resault = await axios.post(port+"/loginWithGoogle",req.body);
    let data = resault.data;
    res.send(data);
})

router.post('/loginWithFacebook', async (req,res)=>{
    let resault = await axios.post(port+"/loginWithFacebook",req.body);
    let data = resault.data;
    res.send(data);
})

router.post('/logout', async (req,res)=>{
    console.log(req.body);
    let resault = await axios.post(port+"/logout",req.body);
    let data = resault.data;
    res.send(data);
})

router.post('/register', async (req,res)=>{
    let resault = await axios.post(port+"/register",req.body);
    let data = resault.data;
    console.log(data);
    console.log(req.body);
    res.send(data);
})

router.post('/getInfo', async (req,res)=>{
    console.log('in get info')
    let resault = await axios.post(port+"/getInfo",req.body);
    let data = resault.data;
    res.send(data);
})

router.post('/refreshTheToken', async (req,res)=>{
    console.log('in refresh token')
    let resault = await axios.post(port+"/refreshTheToken",req.body);
    let data = resault.data;
    res.send(data);
})

module.exports = router;
