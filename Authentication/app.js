const express = require("express");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml')
const app = express();
app.use(express.json());

const container = require("./containerConfig");
const config = container.resolve("config");
const port = config.get("server.port");


app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
 });