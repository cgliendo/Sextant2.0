const {exec} = require('child_process');
const { stdout } = require('process');
let myjson;
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(55460);
const wsServer = new webSocketServer({ httpServer: server });
//const wsServer = new webSocketServer({ httpServer: server, autoAcceptConnections:false });

wsServer.on('request', function (request) {
//    console.log('establishing a new connection with client');
    console.log('establishing a new connection with client',request.origin);
    var connection = request.accept(null, request.origin);
    setInterval(() => {
        // connection.sendUTF(new Date().getTime())
        exec('curl http://192.168.1.189:4027/api', (error, stdout, stderr)=>{
        // console.log(stdout);
        // myjson = JSON.parse(stdout);
        // console.log(myjson);
        connection.sendUTF(stdout);
        // connection.send(myjson);
        // connection.sendBytes(myjson);
});
    }, 1000);
});
