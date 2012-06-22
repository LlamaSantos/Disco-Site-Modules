(function (disco) {
    "use strict";
    var router = disco.router;

    var actions = {
        login: function () {
            disco.facebook.checkAuthStatus(function () {
                actions.updateServer();
                actions.onLogin();
            }, disco.facebook.login({onSuccess: actions.onLogin}));
        },
        updateServer: function () {
            $.post("//node.llamasantos.com:8090/facebook/auth", {token: disco.facebook.accessToken() }, function () {
                console.log("Saved to server");
            });
        },
        onLogin: function () {
            var accessToken = disco.facebook.accessToken() || null;
            if (accessToken) {
                /* grab user info */
                $.getJSON('https://graph.facebook.com/me?access_token=' + accessToken, function (data) {
                    data = data || {};
                    var userPanel = $('.user-panel');
                    userPanel.find('.person-image').attr('src', 'https://graph.facebook.com/' + (data.id || -1) + '/picture?type=normal');
                    userPanel.find('.person-name').html(data.name || '');
                    userPanel.fadeIn(250);

                    /* grab friends */
                    $.getJSON('//node.llamasantos.com:8090/facebook/friends', function (friends) {
                        disco.facebook.fbFriends = (friends || {}).data || [];
                        disco.bus.emit('facebook.initFacebookCards', disco.facebook.fbFriends);
                    });
                });
            }
        }
    };

    router.mount({
        "/facebook": actions.login,
        "/facebook/connect": function () {
            console.log("got to the facebook connect route!");
        }
    });
})(disco);