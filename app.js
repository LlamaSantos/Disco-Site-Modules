/*
Site Modules
 */

var flatiron = require('flatiron');
var connect = require("connect");
var ecstatic = require('ecstatic');
var path = require("path");
var util = require("util");
var site = require("site-modules").site;
var hook = require("./node_modules/site-modules/lib/hook.js");
var useragent = require('connect-useragent');

// -- Allow the application to be exported.
var app = module.exports = flatiron.app;

// -- Add Logging in.
app.use(flatiron.plugins.log, {});

// -- Add Configuration.
app.use(flatiron.plugins.config, { type: 'file', file: './app.json' });

//-- Create the necessary middlewares
app.use(flatiron.plugins.http, {
    before: [
        connect.favicon()
        , connect.cookieParser("keyboard cat")
        , connect.session({ secret: "keyboard cat" })
        , useragent()
        , connect.static(path.join(__dirname, "public"))
    ]
});

// TODO: We need to get this wired up in an intelligent fashion and start using it.
//hook.attach(app, {name:"web-server-hook"},function(){console.log("hook inited");});

//-- Application Bootstrap
site.use(app,__dirname,
    function run (){
        // -- Start the App Up
        try{
            app.start((process.env.PORT || 8090), function (err){
                if (err){
                    app.log.error(err);
                }

                app.log.info("Process has started...");
            });
        }
        catch(ex){
            app.log.error(err);
        }
    },
    function error (err){
        app.log.error(err);
    }
);



