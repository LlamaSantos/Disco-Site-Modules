/**
 * Created with JetBrains WebStorm.
 * User: ehouston
 * Date: 6/19/12
 * Time: 4:34 PM
 * To change this template use File | Settings | File Templates.
 */

var cmd = require("./site_controller.js");

var routes = module.exports = {
    "*" : { get : cmd.index}
};
