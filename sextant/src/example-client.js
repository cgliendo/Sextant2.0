console.log("Works!");
//------------------
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log("connected");
    connection.on('message', function(message) {
        console.log('message:', message);
    //     if (message.type === 'utf8') {
    //         console.log("Received: '" + message.utf8Data + "'");
    //     }
    });
});
// client.connect('ws://localhost:55456/', 'echo-protocol');
client.connect('ws://localhost:55455/');
//------------------
// }

// export const test = ()=> {
    // console.log("this works!!!");
// }

// module.exports = { 
//     clientConnect : test
// }