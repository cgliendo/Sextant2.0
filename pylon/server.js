const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(55455);
const wsServer = new webSocketServer({ httpServer: server });
//const wsServer = new webSocketServer({ httpServer: server, autoAcceptConnections:false });

wsServer.on('request', function (request) {
//    console.log('establishing a new connection with client');
    console.log('establishing a new connection with client',request.origin);
    var connection = request.accept(null, request.origin);
    setInterval(() => {
        connection.sendUTF(new Date().getTime())
    }, 100);
});
