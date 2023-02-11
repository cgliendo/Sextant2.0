const {exec} = require('child_process');
const { stdout } = require('process');
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(55460);
// const wsServer = new webSocketServer({ httpServer: server });
const wsServer = new webSocketServer({ httpServer: server, autoAcceptConnections:false });

//-------------------------------------
//Check Origin
//-------------------------------------
function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    console.log(origin);
    if(origin==='http://localhost:3000')
        return true;
    else
        return false;
  }

let connections = 0;

wsServer.on('request', function (request) {
    let statData;
    let packet = {};
    //-------------------------------------
    //Check Origin (accept/reject)
    //-------------------------------------
    if(!originIsAllowed(request.origin)){
        request.reject();
        console.log('Refusing connection');
        return;
    }
    //diffy-helman?
    var connection = request.accept('echo-protocol', request.origin);
    console.log('New connection:',request.origin);
    connections++;
    //-------------------------------------
    //Receive Message
    //-------------------------------------
    connection.on('message', function(message){
        if(message.type==='utf8'){
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }else if(message.type === 'binary'){
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    //-------------------------------------
    //Send data packet
    //-------------------------------------
    setInterval(() => {
        // connection.sendUTF(new Date().getTime())
        exec('curl http://192.168.1.189:4027/api', (error, stdout, stderr)=>{
            statData = JSON.parse(stdout);
            // hostName = statData.hostName;
            // cpu = Math.round((statData.summary_cpuLoad*100).toFixed(2));
            // gpu = (statData.videoAdapters[0].usage);
            // memory = Math.round((statData.summary_memoryUsed + statData.summary_memoryWired)*100/statData.summary_memoryTotal);    
            // temp_cpu = statData.sensors_temperatureData.split('\n')[2];
            // console.log(hostName);
            packet.time = new Date().getTime();
            packet.connections = connections;
            packet.hostName = statData.hostName;
            packet.cpu = Math.round((statData.summary_cpuLoad*100).toFixed(2));
            packet.gpu = (statData.videoAdapters[0].usage);
            packet.memory = Math.round((statData.summary_memoryUsed + statData.summary_memoryWired)*100/statData.summary_memoryTotal);
            packet.temp_cpu = +statData.sensors_temperatureData.split('\n')[2];
        // console.log(statData);
        // console.log(packet.hostName);
        connection.sendUTF(JSON.stringify(packet));
    });
    }, 3200);
    //-------------------------------------
    //Handle Connection close
    //-------------------------------------
    connection.on('close', function(reasonCode, description) {
        connections--;
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
// wsServer.on('close', function(){
//     console.log('connection closed');
// });
