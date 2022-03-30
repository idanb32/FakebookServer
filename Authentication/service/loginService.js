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
            let formatedUser = this.formatUser(user)
            console.log(formatedUser)
            if (this._loggedInUsers[user._id] != 'userLogged')
                this._loggedInUsers[user._id] = "userLogged";
            let newToken = jwt.sign(formatedUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '14m' });
            let returnMe = { user: formatedUser, token: { accessToken: newToken, refreshToken: refreshToken } };
            console.log(returnMe)
            return returnMe;
        });
    }

    formatUser(user) {
        return {
            _id: user._id,
            user_display: user.user_display,
            email: user.email,
            image_url: user.image_url,
            google_account: user.google_account,
            friends: user.friends,
            friend_groups: user.friend_groups,
            posts: user.posts,
            bloack_list: user.bloack_list
        }
    }

    getInfo(token) {
        console.log(token)
        if (token == null) return false;
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                if (err.expiredAt)
                    return "Expired"
                console.log(err)
                return false;
            }
            return this.formatUser(user);
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
