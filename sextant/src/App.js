import './App.css';
import Banner from './components/Banner';
import Card from './components/Card';
import Exhibit from './components/Exhibit';
import IPdisplay from './components/IPdisplay';
import Latency from './components/Latency';
import ProgressBar from './components/ProgressBar';
import StatisticaPro from './components/StatisticaPro';
import Weather from './components/Weather';
import Clock from './components/Clock';
import { useEffect, useRef } from 'react';

var client;
var W3CWebSocket;
var init = false;
var connected = false;
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
      connected = true;
  };
  client.onmessage = function(e) {
      // console.log('message:', JSON.parse(e.data));
      data = JSON.parse(e.data);
  };
}

const close = ()=>{
  if(connected===true){
    client.close();
    connected=init=false;
  }
}


function App() {
  const statisticaData = useRef({
        hostName: "Connecting...",
        cpu: 0,
        gpu: 0,
        memory: 0,
        temp_cpu: 0
  });

  let interval;
  useEffect(()=>{
    //-------------------------------
    // Setup
    //-------------------------------
    console.log("\n\nApp started.");
    if(!init) connect();
    interval = setInterval(()=>{
      console.log("APP:Timeout:",statisticaData.current);
      statisticaData.current = {...data};
    },5000);

    //-------------------------------
    //Cleanup
    //-------------------------------
    return ()=> {
      console.log("App removed");
      clearInterval(interval);
      close();
  }
  });

  //-------------------------------
  //Render
  //-------------------------------
  return (
    <div className="App">
      <Banner title={document.title}/>
      {/* {pageButtons} */}
      <Exhibit className='exhibit' /*title={pageTitle}*/>
        <Card>
            <h2>Network</h2>
            <IPdisplay/>
            <IPdisplay ipv6={true}/>
            <Latency/>
        </Card>
        <Card>
          <StatisticaPro data={statisticaData}/>
        </Card>
        <Card>
          <Weather/>
        </Card>
        <Card>
          <Clock/>
        </Card>
      </Exhibit>
    </div>
  );
}

export default App;
