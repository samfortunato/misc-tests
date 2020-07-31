var http = require('http');
var fs = require('fs');
var PAGES = {
    INDEX: fs.readFileSync('./index.html'),
    NOT_FOUND: fs.readFileSync('./404.html'),
    SECRETS: fs.readFileSync('./secrets.html')
};
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.server = this.createServer();
    }
    Server.prototype.start = function () {
        this.server.listen(this.port);
    };
    Server.prototype.createServer = function () {
        return http.createServer(this.setupServer.bind(this));
    };
    Server.prototype.setupServer = function (req, res) {
        this.setCorsHeader(res);
        var response = this.getResponse(req);
        res.write(response);
        res.end();
    };
    Server.prototype.setCorsHeader = function (res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    };
    Server.prototype.getResponse = function (req) {
        var response;
        switch (req.url) {
            case '/':
                response = PAGES.INDEX;
                break;
            case '/secrets':
                response = PAGES.SECRETS;
                break;
            default:
                response = PAGES.NOT_FOUND;
                break;
        }
        return response;
    };
    return Server;
}());
var server = new Server(3000);
server.start();
