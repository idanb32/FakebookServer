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

    async login(userName, password) {
        let user = await axios.post(this._dataBaseServer + "/User/GetByName", { username: userName });
        if (!user) return "User not found.";
        if (!hashPassword.comperePasswords(password, user.password)) return "User not found.";
        if (this._loggedInUsers[user._id] == "userLogged") return "User logged in already.";
        this._loggedInUsers[user._id] == "userLogged";
        let mainToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        this.refreshTokens.push(refreshToken);
        return { accessToken: mainToken, refreshToken: refreshToken };
    }

    async loginGoogle(googleObj) {
        let user = await axios.post(this._dataBaseServer + "/User/GetOrCreateGoogle", googleObj);
        if (this._loggedInUsers[user._id] == "userLogged") return "User logged in already.";
        this._loggedInUsers[user._id] == "userLogged";
        let mainToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        this.refreshTokens.push(refreshToken);
        return { accessToken: mainToken, refreshToken: refreshToken };
    }

    async loginFacebook(facebookObj) {
        let user = await axios.post(this._dataBaseServer + "/User/GetOrCreateFacebook", facebookObj);
        if (this._loggedInUsers[user._id] == "userLogged") return "User logged in already.";
        this._loggedInUsers[user._id] == "userLogged";
        let mainToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        this.refreshTokens.push(refreshToken);
        return { accessToken: mainToken, refreshToken: refreshToken };
    }

    refreshTheToken(refreshToken) {
        if (refreshToken == null) return false;
        if (!this.refreshTokens.includes(refreshToken)) return false;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                return false;
            }
            let newToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
            return newToken;
        });
    }

    getInfo(token) {
        if (refreshToken == null) return false;
        if (!this.refreshTokens.includes(refreshToken)) return false;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
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
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                return false;
            }
            return user;
        });
    }


    async logOut(token) {
        this.refreshTokens = this.refreshTokens.filter(currentToken => currentToken !== token);
        let user = this.getInfoFromRefresh(token);
        this._loggedInUsers = this._loggedInUsers.filter(currentUser => currentUser !== user);
    }

}
