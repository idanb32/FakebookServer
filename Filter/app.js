const express = require("express");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml')
const app = express();
const cors = require('cors');

const container = require("./containerConfig");
const config = container.resolve("config");
const port = config.get("server.port");
const origin = config.get('server.originAllowed');

app.use(express.json());
app.use(cors({
    origin: origin
}));

const router = require('./routers/router');

app.use('/', router);



app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
 });