/**
 * Created with JetBrains WebStorm.
 * User: jwhite
 * Date: 5/23/12
 * Time: 4:39 PM
 * To change this template use File | Settings | File Templates.
 */

var cmd = require("./facebook_controller.js");

var routes = module.exports = {
    "/" : { get : cmd.index },
    "/facebook/auth" : { post : cmd.auth },
    "/facebook/family" : { get: cmd.family },
    "/facebook/friends" : {get : cmd.friends }
};