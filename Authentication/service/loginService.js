require('dotenv').config()
const axios = require('axios');
const hashPassword = require('./hashPassword');
const jwt = require('jsonwebtoken')

module.exports = class LoginService {
    constructor(config) {
        this._config = config;
        this._dataBaseServer = this._config.get("db.port");
        this._loggedInUsers = {};
        this.refreshTokens = [];
    }

    async loginFromBody(body) {
        return await this.login(body.username, body.password);
    }

    async registerFromBody(body) {
        return await this.register(body.username,
            body.password,
            body.userDisplay,
            body.imgurl,
            body.email);
    }

    async login(userName, password) {
        let userReq = await axios.post(this._dataBaseServer + "User/GetByName", { username: userName });
        let user = userReq.data;
        if (!user) return "User not found.";
        if (!hashPassword.comperePasswords(password, user.password)) return "User not found.";
        if (this._loggedInUsers[user._id] == "userLogged") return "User logged in already.";
        this._loggedInUsers[user._id] = "userLogged";
        let mainToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14m' });
        let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        this.refreshTokens.push(refreshToken);
        return { accessToken: mainToken, refreshToken: refreshToken };
    }

    async loginGoogle(googleObj) {
        console.log(googleObj);
        let userReq = await axios.post(this._dataBaseServer + "User/GetOrCreateGoogle", googleObj);
        let user = userReq.data;
        if (this._loggedInUsers[user._id] == "userLogged") return "User logged in already.";
        this._loggedInUsers[user._id] = "userLogged";
        let mainToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14m' });
        let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        this.refreshTokens.push(refreshToken);
        return { accessToken: mainToken, refreshToken: refreshToken };
    }

    async loginFacebook(facebookObj) {
        console.log(facebookObj);
        let userReq = await axios.post(this._dataBaseServer + "User/GetOrCreateFacebook", facebookObj);
        let user = userReq.data;
        if (this._loggedInUsers[user._id] == "userLogged") return "User logged in already.";
        this._loggedInUsers[user._id] = "userLogged";
        let mainToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14m' });
        let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        this.refreshTokens.push(refreshToken);
        return { accessToken: mainToken, refreshToken: refreshToken };
    }

    refreshTheToken(refreshToken) {
        if (refreshToken == null) return false;
        if (!this.refreshTokens.includes(refreshToken)) {
            this.refreshTokens.push(refreshToken);
        };
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                return false;
            }
            if (this._loggedInUsers[user._id] != 'userLogged')
                this._loggedInUsers[user._id] = "userLogged";
            let newToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14m' });
            return newToken;
        });
    }

    getInfo(token) {
        if (token == null) return false;
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(user);
            if (err) {
                console.log(err)
                return false;
            }
            return user;
        });
    }

    getInfoFromRefresh(token) {
        if (refreshToken == null) return false;
        if (!this.refreshTokens.includes(refreshToken)) return false;
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                return false;
            }
            return user;
        });
    }


    logOut(token) {
        if (this.refreshTheTokens)
            this.refreshTokens = this.refreshTokens.filter(currentToken => currentToken !== token);
        let user = this.getInfoFromRefresh(token);
        this._loggedInUsers = this._loggedInUsers.filter(currentUser => currentUser !== user);
    }

    async register(username, password, userDisplay, imgurl, email) {
        let hashedPassword = await hashPassword.hashPassword(password);
        let newUser = {
            userName: username,
            password: hashedPassword,
            userDisplay: userDisplay,
            imgurl: imgurl,
            email: email
        }
        console.log(newUser);
        let userReq = await axios.post(this._dataBaseServer + "User/Add", newUser);
        let user = userReq.data;
        if (!user) return "There is already a user with this user name";
        this._loggedInUsers[user._id] == "userLogged";
        let mainToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        this.refreshTokens.push(refreshToken);
        return { accessToken: mainToken, refreshToken: refreshToken };
    }

}
