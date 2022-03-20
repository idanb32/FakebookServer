const awilix = require("awilix");
const config = require("config");
const loginService = require('./service/loginService');
const container = awilix.createContainer({ injectionMode: awilix.InjectionMode.CLASSIC });

container.register({
    config: awilix.asValue(config),
    LoginService: awilix.asClass(loginService).singleton()
});
module.exports = container;