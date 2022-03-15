const awilix = require("awilix");
const config = require("config");

const container = awilix.createContainer( {injectionMode: awilix.InjectionMode.CLASSIC});

container.register({
    config: awilix.asValue(config)
});
module.exports = container;