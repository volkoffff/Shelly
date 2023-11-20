import React, { useState, useEffect } from "react";
import axios from "axios";

export function History() {

    // const symfonyApiUrl = 'http://127.0.0.1:8000';
    // const [data, setData] = useState([]); // Déclarez un état local pour stocker les données

    // // Utilisez useEffect pour déclencher la requête HTTP lorsque le composant est monté
    // useEffect(() => {
    //     fetchSauvegarde();
    // }, []);

    // const fetchSauvegarde = async () => {
    //     try {
    //       const response = await axios.get(`${symfonyApiUrl}/api/sauvegarde_isons`);
    //       const responseData = response.data["hydra:member"]; // Stockez les données dans une variable
    //       console.log('$$$',responseData);
    //       setData(responseData); // Mettez à jour l'état local avec les données
    //     } catch (error) {
    //       console.error('Erreur lors de la récupération de l\'état de l\'interrupteur Shelly', error);
    //     }
    // };

    return (
        <>
            <h2 className="text-2xl font-semibold mt-8">historique</h2>
            {/* {data.map((save, index) => (
                <div key={index}>
                    {save.ison}
                </div>
            ))} */}
        </>
    );
}
