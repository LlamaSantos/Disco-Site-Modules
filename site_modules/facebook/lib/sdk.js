(function (module, exports){
    "use strict";

    var _ = require("underscore");
    var request = require("request");
    var FacebookUser = require("./models/facebookUser.js");
    var fields = "fields=id,first_name,last_name,locale,gender,username,birthday,hometown";

    module[exports] = function (accessToken){
        var token = accessToken;
        return {
            family : function (callback, error){
                request("https://graph.facebook.com/me/family?access_token=" + token + "&" + fields, function (err, response, body){
                    if (err){
                        error(err);
                    }else{
                        var data = JSON.parse(body);
                        var family = _.chain(data.data || []).map(function (user){
                            var fbUser =  new (FacebookUser)(user);
                            return fbUser;
                        }).flatten().value();
                        callback(family);
                    }
                });
            },
            friends : function (callback, error) {
                request("https://graph.facebook.com/me/friends?access_token=" + token + "&" + fields, function (err, response, body){
                    if (err){
                        error(err);
                    }else{
                        var data = JSON.parse(body);
                        var family = _.chain(data.data || []).map(function (user){
                            var fbUser =  new (FacebookUser)(user);
                            return fbUser;
                        }).flatten().value();
                        callback(family);
                    }
                });
            }
        }
    };
})(module, "exports");