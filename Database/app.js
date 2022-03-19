const express = require("express");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml')
const cors = require('cors');
const app = express();
app.use(express.json());

const container = require("./containerConfig");
const config = container.resolve("config");
const port = config.get("server.port");
const origin = config.get('server.allowedOrigin');

const CommentsRouter = require('./routers/CommentsRouter');
const UserRouter = require('./routers/UserRouter');
const PostRouter = require('./routers/PostRouter')


app.use(cors({
    origin: origin
}));

app.use('/Comment', CommentsRouter);
app.use('/User', UserRouter);
app.use('/Post', PostRouter);

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});