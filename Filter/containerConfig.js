const awilix = require("awilix");
const config = require("config");
const axios = require('axios')

const container = awilix.createContainer( {injectionMode: awilix.InjectionMode.CLASSIC});

container.register({
    config: awilix.asValue(config),
    axios: awilix.asValue(axios)
});
module.exports = container;