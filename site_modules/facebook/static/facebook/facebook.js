//if (!disco){var disco={};}
//if (!disco.facebook)disco.facebook={};

disco = (function (connection) {
    var authResponse = null;

    pub = {
        initFacebook: function () {
            //window.FB.Flash.hasMinVersion = function () { return false; };
            window.FB.init({
                appId: '140160923197',
                status: true,
                cookie: true,
                oauth: true
            });

            // Hack to fix http://bugs.developers.facebook.net/show_bug.cgi?id=20168 for IE7/8/9
            //FB.UIServer.setLoadedNode = function (a, b) { FB.UIServer._loadedNodes[a.id] = b; };
            // per http://stackoverflow.com/questions/7343226/facebook-login-throws-permission-denied
        },

        checkAuthStatus: function (callback, onFail) {
            var me = this;
            if (authResponse) {
                callback();
            } else {
                FB.getLoginStatus(function (response) {
                    authResponse = response.authResponse;
                    if (response.authResponse) {
                        callback(response);
                    } else {
                        if (onFail && typeof (onFail) === "function") {
                            onFail(response);
                        }
                    }
                });
            }
        },

        login: function (params) {
            var options = _.extend({
                permissions: '',
                onSuccess: function (fbtoken) {
                },
                onFailure: function () {
                }
            }, params);
            FB.login(function (response) {
                if (response.authResponse) {
                    options.onSuccess(response.authResponse.accessToken);
                } else {
                    options.onFailure();
                }
            }, { scope: options.permissions });
        },

        accessToken: function () {
            return FB.getAuthResponse().accessToken;
        }
    };

    connection.facebook = pub;
    pub.initFacebook();
    return connection;
})(disco || {});