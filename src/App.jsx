import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';

import { History } from './Components/History';

const App = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // const shellyApiUrl = 'http://192.168.1.100';

  const serverUri = 'https://shelly-77-eu.shelly.cloud';
  const deviceId = '4022d88e30e8';
  const authKey = 'MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73';

  // Create an object with the data to send
  const fetchSwitchStatus = async () => {
    try {
      // const response = await axios.get(`${shellyApiUrl}/relay/0`);
      const response = await axios.get(`${serverUri}/device/status?id=${deviceId}&auth_key=${authKey}`);
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
    url: 'https://shelly-77-eu.shelly.cloud/device/relay/control',
    headers: { 
      ...data 
    },
    data : data
  };

  const toggleSwitch = async () => {
    try {
      const newStatus = !isSwitchOn;
        await axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
      setIsSwitchOn(newStatus);
    } catch (error) {
      console.error('Erreur lors de la commutation de l\'interrupteur Shelly', error);
    }
  };
  // function to test when prise AFK
  // function toggleSwitch() {
  //   setIsSwitchOn(!isSwitchOn)
  // }

  useEffect(() => {
    fetchSwitchStatus(); // Appel initial
    const interval = setInterval(fetchSwitchStatus, 1000); // Mettre à jour toutes les 10 secondes

    return () => {
      clearInterval(interval); // Nettoyer l'intervalle lors de la suppression du composant
    };
  }, []);

  return ( <>
    <h1 className='text-2xl font-semibold mb-8'>Interface Shelly</h1>
    <div className="App flex gap-4">

      <div
        onClick={toggleSwitch}
        className={`w-44 h-56 border-[3px] border-slate-100 rounded-xl overflow-hidden relative flex flex-col bg-slate-100 active:scale-[0.97] transition-all ${
        isSwitchOn && 'border-blue-500'} `}
      >
        <div className='flex justify-start mx-4 pt-2 relative z-10'>
          {isSwitchOn ?
          <div className='flex items-center gap-2'>
            <div className='w-2.5 h-2.5 rounded-full bg-blue-500 pop-animation'></div>
            <p className='text-blue-700 '>Allumé</p>
          </div>
          :
          <div className='flex items-center gap-2 relative z-10'>
            <div className='w-2.5  h-2.5 rounded-full bg-slate-400/80'></div>
            <p className='text-slate-500/80'>Éteint</p>
          </div>
          }
        </div>

        {isSwitchOn ?
        <div className='text-[80px] text-blue-500 flex-1 flex justify-center items-center relative z-10'>
            <svg className="" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M9.973 18H11v-5h2v5h1.027c.132-1.202.745-2.194 1.74-3.277.113-.122.832-.867.917-.973a6 6 0 1 0-9.37-.002c.086.107.807.853.918.974.996 1.084 1.609 2.076 1.741 3.278zM10 20v1h4v-1h-4zm-4.246-5a8 8 0 1 1 12.49.002C17.624 15.774 16 17 16 18.5V21a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C8 17 6.375 15.774 5.754 15z"></path></g></svg>
        </div>
        :
        <div className='text-[80px] text-slate-500/80 flex-1 flex justify-center items-center relative z-10'>
        <svg className="" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M9.973 18H11v-5h2v5h1.027c.132-1.202.745-2.194 1.74-3.277.113-.122.832-.867.917-.973a6 6 0 1 0-9.37-.002c.086.107.807.853.918.974.996 1.084 1.609 2.076 1.741 3.278zM10 20v1h4v-1h-4zm-4.246-5a8 8 0 1 1 12.49.002C17.624 15.774 16 17 16 18.5V21a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C8 17 6.375 15.774 5.754 15z"></path></g></svg>
        </div>
        }

        <div className='mx-4 pb-2 relative z-10'>
          <p className='font-semibold tet-slate-900'>Shelly lampe h111</p>
          <p className='text-slate-400 '>28°C</p>
        </div>

        <div className='text-[250px] -right-24 absolute z-0 text-slate-200/50 flex-1 flex justify-center items-center'>
            <svg className="" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M9.973 18H11v-5h2v5h1.027c.132-1.202.745-2.194 1.74-3.277.113-.122.832-.867.917-.973a6 6 0 1 0-9.37-.002c.086.107.807.853.918.974.996 1.084 1.609 2.076 1.741 3.278zM10 20v1h4v-1h-4zm-4.246-5a8 8 0 1 1 12.49.002C17.624 15.774 16 17 16 18.5V21a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C8 17 6.375 15.774 5.754 15z"></path></g></svg>
        </div>
      </div>

      <div className='w-44 h-56 cursor-pointer border-[3px] border-dashed border-slate-200/80 hover:border-slate-300/70 rounded-xl flex flex-col items-center justify-center text-slate-400'>
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1551322312294" viewBox="0 0 1024 1024" version="1.1" pId="10297" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" pId="10298"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" pId="10299"></path></svg>
        <p>Ajouter un appareil</p>
      </div>

    </div>

    <History />
  </>);
};

export default App;
