var cmd = require("./footer_controller.js");

var routes = module.exports = {
    "*": { get: cmd.index}
};