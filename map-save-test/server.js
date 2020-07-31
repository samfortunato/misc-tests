const http = require('http');

class Server {
  constructor(port) {
    this._port = port;
    this._server = this._createServer();
  }

  _createServer() {
    return http.createServer(this._requestListener.bind(this));
  }

  _requestListener(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    response = this._getResponse(req);

    res.write(response);
    res.send();
  }

  _getResponse(req) {
    let response;

    switch (req.url) {
      case '/maps':
        if (req.method === 'POST') {
          MapsService.save(req.body);
        }

        break;

      default:
        response = { body: '404' };
        break;
    }

    return response;
  }
}

class MapsService {
  static _maps = new Map();

  static save(mapJson) {
    const mapId = JSON.parse(mapJson).id;
    this._maps.set(mapId, mapJson);
  }
}
