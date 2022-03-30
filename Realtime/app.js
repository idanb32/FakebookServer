const express = require("express");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml');
const http = require('http');
const cors = require('cors');
const SocketService = require('./service/SocketService');
const app = express();

const container = require("./containerConfig");
const config = container.resolve("config");
const port = config.get("server.port");
const origin = config.get("server.originAllowed");

app.use(express.json());
app.use(cors({
    origin: origin
}));

const server = http.createServer(app);
const socketIoServer = require('socket.io')(server, {
    cors: {
        origin: origin
    }
});
const myIoServerInstance = new SocketService(socketIoServer);
myIoServerInstance.startServer();

console.log("hi");
socketIoServer.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});