const http = require('http');
const fs = require('fs');

const PAGES = {
  INDEX: fs.readFileSync('./index.html'),
  NOT_FOUND: fs.readFileSync('./404.html'),
  SECRETS: fs.readFileSync('./secrets.html'),
};

class Server {
  private port: number;
  private server: http.Server;

  constructor(port: number) {
    this.port = port;
    this.server = this.createServer();
  }

  start(): void {
    this.server.listen(this.port);
  }

  private createServer(): http.Server {
    return http.createServer(this.setupServer.bind(this));
  }

  private setupServer(req: http.IncomingMessage, res: http.ServerResponse): void {
    this.setCorsHeader(res);

    const response = this.getResponse(req);

    res.write(response);
    res.end();
  }

  private setCorsHeader(res: http.ServerResponse): void {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  private getResponse(req: http.IncomingMessage): Buffer {
    let response: Buffer;

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
  }
}

const server = new Server(3000);
server.start();
