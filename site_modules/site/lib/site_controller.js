var controller = module.exports = (function () {
    "use strict";

    return {
        index: function index(next) {
            this.view(function (page) {
                page.append("", "site", {
                    finalScripts: [
                        "<script type='text/javascript'>disco.router.init();</script>"
                    ]
                });
            });

            next();
        }
    };
})();