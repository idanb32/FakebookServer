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

        })

    }
}
