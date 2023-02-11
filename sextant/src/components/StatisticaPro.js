import { memo, useEffect, useState, useRef } from "react";
import ProgressBar from "./ProgressBar";
import StatItem from "./StatItem";
var client;
var W3CWebSocket;
let init = false;
var data;

const connect = (callback)=>{
    if(!init){
        init=true;
        W3CWebSocket = require('websocket').w3cwebsocket;
        // client = new W3CWebSocket('ws://localhost:55460/', null);
        client = new W3CWebSocket('ws://localhost:55460/', 'echo-protocol');
    }
    client.onclose = function() {
        console.log('Connection Closed');
    }
    client.onerror = function() {
        console.log('Connection Error');
    }; 
    client.onopen = function() {
        console.log('WebSocket Client Connected');
        // connected = true;
    };
    client.onmessage = function(e) {
        console.log('message:', JSON.parse(e.data));
        data = JSON.parse(e.data);
        // flag = true;
        callback(true);
    };
}
const close = ()=>{

}

const StatisticaPro = (props) => {
    // let hostName = 'Connecting...';
    // console.log('render')
    const [hostName,setHostname] = useState('Connecting...');
    const [renderData,setRenderData] = useState({
        hostName: "Connecting...",
        cpu: 0,
        gpu: 0,
        memory: 0,
        temp_cpu: 0
    });

    const [flag,setFlag] = useState(false);
    const handleSetFlag = ()=>{
        console.log("callback");
        setRenderData(data);
    }


    useEffect(() => {
        console.log('in useEffect');
      if(!init) connect(handleSetFlag);
        // return ()=> client.close();
    },[]);
    let temp_color = renderData.temp_cpu >= 85 ? 'warning': undefined;
    temp_color = renderData.temp_cpu >= 95 ? 'danger': temp_color;
    console.log('Rendering...');
    return (
        <div>
            <h2>{renderData.hostName}</h2>
            <ProgressBar percent={ renderData.cpu }
                         label='CPU Load'
                         unit='%'
                         />
            <ProgressBar percent={ renderData.gpu }
                         label='GPU Load'
                         unit='%'
                         />
            <ProgressBar percent={ renderData.memory }
                         label='Memory'
                         unit='%'
                         />
            <ProgressBar percent={ renderData.temp_cpu * 0.8 }
                         value={ renderData.temp_cpu }
                         type={temp_color}
                         label='CPU Temp'
                         unit='°C'
                         />
        </div>
    );
    }
    export default StatisticaPro;

