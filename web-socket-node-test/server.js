const http = require('http');
const fs = require('fs');

const Constants = {
  HTTP_HEADERS: { UPGRADE: { VALUES: { WEB_SOCKET: 'websocket' } } },
  MESSAGES: { WEB_SOCKET: { END_BAD_REQUEST: 'HTTP/1.1 400 Bad Request' } },
};

class Server {
  constructor(port) {
    this._port = port;
    this._server = this._createServer();

    this._setupWebSocketListener();
  }

  start() {
    this._server.listen(this._port);
  }

  _createServer() {
    return http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');

      this._setEcmaScriptModuleHeaders(res, req.url);

      const file = this._getRequestedFile(req.url);
      res.write(file);
      res.end();
    });
  }

  _setupWebSocketListener() {
    this._server.on('upgrade', (req, socket) => {
      if (req.headers.upgrade !== Constants.HTTP_HEADERS.UPGRADE.VALUES.WEB_SOCKET) {
        socket.end(Constants.MESSAGES.WEB_SOCKET.END_BAD_REQUEST);
      }
    });
  }

  _setEcmaScriptModuleHeaders(res, requestedUrl) {
    if (/\.mjs$/.test(requestedUrl)) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }

  _getRequestedFile(url) {
    const filePath = (url === '/' ? './index.html' : `.${url}`);
    let file;

    try {
      file = fs.readFileSync(filePath);
    } catch (err) {
      console.error(err);
      file = {};
    }

    return file;
  }
}

new Server(3000).start();
