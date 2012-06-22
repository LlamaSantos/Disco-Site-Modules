/**
 * Created with JetBrains WebStorm.
 * User: ehouston
 * Date: 6/19/12
 * Time: 11:31 AM
 * To change this template use File | Settings | File Templates.
 */
var cmd = require("./header_controller.js");

var routes = module.exports = {
    "*" : { get : cmd.index}
};