import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';

import { History } from './Components/History';

const App = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // const shellyApiUrl = 'http://192.168.1.100';

  const serverUri = 'https://shelly-86-eu.shelly.cloud';
  const deviceId = '80646F827174';
  const authKey = 'MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480';

  // Create an object with the data to send
 

  const fetchSwitchStatus = async () => {
    try {
      // const response = await axios.get(`${shellyApiUrl}/relay/0`);
      const response = await axios.get(`${serverUri}/device/relay/control?id=${deviceId}&auth_key=${authKey}`);
      setIsSwitchOn(response.data.ison);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'état de l\'interrupteur Shelly', error);
    }
  };


  let data = new FormData();
  data.append('channel', '0');
  data.append('id', deviceId);
  data.append('auth_key', authKey);
  data.append('turn', 'on');

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://shelly-86-eu.shelly.cloud/device/relay/control',
    headers: { 
      ...data 
    },
    data : data
  };

  const toggleSwitch = async () => {
    try {
      const newStatus = !isSwitchOn;
      // await axios.post(`${shellyApiUrl}/relay/0?turn=${isSwitchOn == true ? 'off' : 'on'}`);
        await axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
      setIsSwitchOn(newStatus);
    } catch (error) {
      console.error('Erreur lors de la commutation de l\'interrupteur Shelly', error);
    }
  };

  useEffect(() => {
    fetchSwitchStatus(); // Appel initial
    const interval = setInterval(fetchSwitchStatus, 1000); // Mettre à jour toutes les 10 secondes

    return () => {
      clearInterval(interval); // Nettoyer l'intervalle lors de la suppression du composant
    };
  }, []);

  return ( <>
    <div className="App">
      <h1>Interface Shelly</h1>
      <div onClick={toggleSwitch} className='box-domotique' style={{borderColor: isSwitchOn == true ? "blue" : "rgb(240, 244, 244)"}}>
        
        <p className="svg-icon">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M9.973 18H11v-5h2v5h1.027c.132-1.202.745-2.194 1.74-3.277.113-.122.832-.867.917-.973a6 6 0 1 0-9.37-.002c.086.107.807.853.918.974.996 1.084 1.609 2.076 1.741 3.278zM10 20v1h4v-1h-4zm-4.246-5a8 8 0 1 1 12.49.002C17.624 15.774 16 17 16 18.5V21a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C8 17 6.375 15.774 5.754 15z"></path></g></svg>
        </p>
        <p>{isSwitchOn ? 'allumé' : 'éteint'}</p>

        <span style={{background: isSwitchOn == true ? "blue" : "white"}}></span>
      </div>
    </div>

    <History />
  </>);
};

export default App;
