var controller = module.exports = (function () {
    "use strict";



    return {
        index: function index(next) {
            // -- Render the various page sections
            this.view(function (page) {
                page.append(".header", "header", {

                });

                page.scripts([
                    "<script type='text/javascript' src='/header/header.js'></script>"
                ]);
            });

            next();
        }
    };
})();