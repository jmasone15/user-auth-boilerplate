const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy(["/auth", "/thing"], { target: "http://localhost:3001" })
    );
};