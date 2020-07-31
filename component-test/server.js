const http = require('http');
const fs = require('fs');

class Server {
  constructor(port) {
    this._port = port;
    this._server = this._createServer();
  }

  start() { this._server.listen(this._port); }

  _createServer() {
    return http.createServer((req, res) => {
      console.log(req.url);

      res.setHeader('Access-Control-Allow-Origin', '*');

      if (req.url.match(/\.mjs$/)) {
        res.setHeader('Content-Type', 'application/javascript');
      }

      try {
        res.write(this._getCorrectFile(req.url));
      } catch (err) {
        console.log(err);
      }

      res.end();
    });
  }

  _getCorrectFile(url) {
    let file;

    if (url === '/') {
      file = fs.readFileSync('./index.html');
    } else {
      file = fs.readFileSync(`.${url}`);
    }

    return file;
  }
}

new Server(3001).start();
