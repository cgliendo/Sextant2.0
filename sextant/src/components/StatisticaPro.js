import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

var client;
var W3CWebSocket;
let init = false;
let intervalPtr;

const StatisticaPro = (props) => {
    let delta = 0;
    // let statData;
    let computerName;
    const [statData, setStatData] = useState({});
    const [latency, setLatency] = useState(0);
    const [largest,setLargest] = useState(5);
    // let connected = false;
    useEffect(() => {        
        
        if(!init){
            init=true;
            W3CWebSocket = require('websocket').w3cwebsocket;
            client = new W3CWebSocket('ws://localhost:55460/', null);
        }
    
        client.onerror = function() {
            console.log('Connection Error');
        };
    
        client.onopen = function() {
            console.log('WebSocket Client Connected');
            // connected = true;
        };
    
        client.onmessage = function(e) {
            // delta = Date.now() - e.data;
            // console.log(e.data);
            // statData = JSON.parse(e.data);
            setStatData(JSON.parse(e.data));
        };
        // intervalPtr = setInterval(() => {
        //     setLatency(delta);
        //     if(delta>largest)
        //         setLargest(delta); 
        //     // console.log(delta,'ms');
        // }, 750);  
        // return () => { //done
        //     clearInterval(intervalPtr);
        // }

    });

    const barWidth = 100*latency/largest;

    // if(!connected)
    //     latency = ''

    return (
        // <div className="latency-container">
        <div>
            <h3>{statData.hostName}</h3>
            <p>{statData.summary_cpuLoad}</p>
            <ProgressBar percent={statData.summary_cpuLoad*100}
                         label='CPU Load'
                         unit='%'
                         value={statData.summary_cpuLoad*100}
                         />
        </div>
    );
    }
    export default StatisticaPro;

