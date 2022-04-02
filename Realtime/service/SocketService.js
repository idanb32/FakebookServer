const axios = require('axios');
const container = require('../containerConfig');
const config = container.resolve("config");
const dbPort = config.get('database.port');
const gatewayPort = config.get('gateway.port');
module.exports = class SocketService {
    constructor(server) {
        this.server = server;
        this.clients = {};
    }

    // work with the id itself 
    startServer() {
        console.log("startedPost");
        this.server.on('connection', socket => {
            socket.on('signIn', (id) => {
                this.clients[id] = socket.id;
                console.log(`${id} connected! socket id: ${socket.id}`);
            });

            socket.on('addPost', async (fullPost) => {
                let postMe = fullPost.post;
                let post = await axios.post(dbPort + '/Post/AddFull', postMe);
                for (let position in fullPost.postTo) {
                    let friend = fullPost.postTo[position];
                    if (this.clients[friend] != null && this.clients[friend] != undefined) {
                        let friendSocketId = this.clients[friend];
                        console.log(`posting to ${friendSocketId}`);
                        socket.to(friendSocketId).emit('FriendPosted', (post.data));
                    }
                }
            })

            socket.on('updatedPost', async (data) => {
                let dataForServer = data.data;
                let serverRes = await axios.post(gatewayPort + '/filter/UpdatePost', dataForServer);
                if (!serverRes.data) return;
                socket.emit('postHasBeenUpdated', serverRes.data);
                for (let friend of data.friends) {
                    if (this.clients[friend] != null && this.clients[friend] != undefined) {
                        let friendSocketId = this.clients[friend];
                        socket.to(friendSocketId).emit('postHasBeenUpdated', serverRes.data);
                    }
                }
            })

            socket.on("AddANewFriend", async (data) => {
                console.log('in add a new friend');
                let resault = await axios.post(gatewayPort + '/friends/AddFriend', data);
                if (!resault.data) return
                if (this.clients[data.id] != null && this.clients[data.id] != undefined) {
                    console.log(`emiting! to ${data.id}`);
                    let socketId = this.clients[data.id];
                    console.log(`and it id is:  ${socketId}`);
                    socket.emit("addFriend", (data.friendId));
                }
                if (this.clients[data.friendId] != null && this.clients[data.friendId] != undefined) {
                    let friendSocketId = this.clients[data.friendId];
                    console.log('emiting!');
                    socket.to(friendSocketId).emit("addFriend", (data.id));
                }

            });

            socket.on("AddANewFriendGroup", async (data) => {
                console.log(`in add a new group `);
                let users = data.usersId;
                let resault = await axios.post(gatewayPort + '/friends/AddFriendsGroup', data);
                if (!resault.data) return
                for (let user of users) {
                    console.log(this.clients[user]);
                    if (this.clients[user] == socket.id) {
                        console.log("emitToMe");
                        socket.emit("addedToFriendGroup", (resault.data));
                    }
                    else {
                        let friendSocketId = this.clients[data.user];
                        if (friendSocketId != null && friendSocketId != undefined)
                            socket.to(friendSocketId).emit("addedToFriendGroup", (resault.data));
                    }
                }
            });
            socket.on("logOut", async (refreshTheToken) => {
                console.log();
                delete this.clients[socket.id];
                let resault = await axios.post(gatewayPort + '/authentication/logout', { token: refreshTheToken });

            })

        })

    }
}
