const express = require('express');
const router = express.Router();
const container = require('../containerConfig');
const LoginService = container.resolve('LoginService')


router.post('/login', async (req, res) => {
    let resault = await LoginService.loginFromBody(req.body);
    console.log(resault);
    res.send(resault);
})

router.post('/loginWithGoogle', async (req, res) => {
    let resault = await LoginService.loginGoogle(req.body);
    console.log(resault);
    res.send(resault);
})

router.post('/loginWithFacebook', async (req, res) => {
    let resault = await LoginService.loginFacebook(req.body);
    console.log(resault);
    res.send(resault);
})

router.post('/logout',  (req, res) => {
    LoginService.logOut(req.body.token);
    res.send('loggedOut');
})

router.post('/register', async (req, res) => {
    let resault = await LoginService.registerFromBody(req.body);
    res.send(resault);
})

router.post('/getInfo', (req, res) => {
    let resault = LoginService.getInfo(req.body.token);
    console.log(resault);
    res.send(resault);
})

router.post('/refreshTheToken', (req, res) => {
    console.log("in refresh token")
    let resault = LoginService.refreshTheToken(req.body.refreshToken);
    res.send(resault);
})


module.exports = router;