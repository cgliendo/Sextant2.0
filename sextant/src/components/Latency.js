import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

var client;
var W3CWebSocket;
let init = false;
let intervalPtr;

const Latency = (props) => {
    let delta = 0;
    const [latency, setLatency] = useState(0);
    const [largest,setLargest] = useState(5);
    // let connected = false;
    useEffect(() => {        
        
        if(!init){
            init=true;
            W3CWebSocket = require('websocket').w3cwebsocket;
            client = new W3CWebSocket('ws://localhost:55455/', null);
        }
    
        client.onerror = function() {
            console.log('Connection Error');
        };
    
        client.onopen = function() {
            console.log('WebSocket Client Connected');
            // connected = true;
        };
    
        client.onmessage = function(e) {
            delta = Date.now() - e.data;
        };

        intervalPtr = setInterval(() => {
            setLatency(delta);
            if(delta>largest)
                setLargest(delta); 
            // console.log(delta,'ms');
        }, 750);  
        return () => { //done
            clearInterval(intervalPtr);
      }
    }, [latency]);

    const barWidth = 100*latency/largest;

    // if(!connected)
    //     latency = ''

    return (
        <div className="latency-container">
            <ProgressBar percent={barWidth}
                         label='Latency'
                         unit='ms'
                         value={latency}
                         />
        </div>
    );
    }
    export default Latency;

