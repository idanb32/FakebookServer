const awilix = require("awilix");
const config = require("config");
const axios = require('axios');
const container = awilix.createContainer( {injectionMode: awilix.InjectionMode.CLASSIC});
const multer = require('multer');
const upload = multer();


container.register({
    config: awilix.asValue(config),
    axios: awilix.asValue(axios),
    multer: awilix.asValue(upload)
});
module.exports = container;