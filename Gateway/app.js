const express = require("express");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml');
const cors = require('cors');
const app = express();


const container = require("./containerConfig");
const config = container.resolve("config");
const port = config.get("server.port");
const origin = config.get('server.originAllowed');

app.use(express.json());
app.use(cors({
    origin: origin
}));

const fileRouter= require('./routers/fileRouter');
const authenticationRouter= require('./routers/authenticationRouter');
const friendsRouter = require('./routers/friendsRouter');
const filterRouter = require('./routers/filterRouter');


app.use('/file',fileRouter);
app.use('/authentication', authenticationRouter);
app.use('/friends' , friendsRouter);
app.use('/filter' , filterRouter);

app.use(express.static(__dirname ))

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
 });