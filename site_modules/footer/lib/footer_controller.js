var controller = module.exports = (function () {
    "use strict";

    return {
        index: function index(next) {
            // -- Render the various page sections
            this.view(function (page) {
                page.append(".footer", "footer", {
                    classes: "bottom left",
                    pid: "8472632",
                    data: "<p>Cobra stuff!</p>"
                });
            });

            next();
        }
    };
})();