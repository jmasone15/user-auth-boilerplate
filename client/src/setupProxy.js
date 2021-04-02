const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy(["/auth", "/thing"], { target: " desolate-citadel-94962.herokuapp.com" })
    );
};