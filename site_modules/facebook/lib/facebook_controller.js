var https = require('https');

var controller = module.exports = (function () {
    "use strict";

    return {
        index: function index(next) {
            var self = this;

            // -- Render the various page sections
            self.view(function (page) {
                page.append(".body", "facebook");
                page.scripts([
                    '<script type="text/javascript" src="/fb.js"></script>'
                    , '<script type="text/javascript" src="/facebook/facebook.js"></script>'
                    , '<script type="text/javascript" src="/facebook/main.js"></script>'
                ]);
            });

            next();
        },
        auth : function (next){
            var self = this;
            if (self.req.body.token){
                self.req.session.token = this.req.body.token;
            }
            self.json({
                success: true
            });
        },
        family : function (next){
            var self = this;
            var sdk = require("./sdk.js")(self.req.session.token);

            sdk.family(function (data){
                self.json({
                    data : data,
                    model : "./facebookUser.js",
                    success: true
                });
            }, function (err){
                self.res.log.error(err);
                next();
            });
        },
        friends : function (next){
            var self = this;
            var sdk = require("./sdk.js")(self.req.session.token);

            sdk.friends(function (data){
                self.json({
                    data : data,
                    model : "./facebookUser.js",
                    success: true
                });
            }, function (err){
                self.res.log.error(err);
                next();
            });
        }

    };
})();