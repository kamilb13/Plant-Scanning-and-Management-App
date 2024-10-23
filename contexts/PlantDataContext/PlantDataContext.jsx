import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';



export const PlantDataContext = createContext();


export const PlantDataProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);


    const addPlant = (newPlant) => {
        console.log("nowa roslina " + JSON.stringify(newPlant))
        setPlants([...plants, newPlant])
    };


    const removePlant = (id) => {
        setPlants(plants.filter(plant => plant.id !== id));
        console.log(id);
        console.log(JSON.stringify(plants));
    };






    return (
        <PlantDataContext.Provider value={{ plants, setPlants, addPlant, removePlant }}>
            {children}
        </PlantDataContext.Provider>
    );
};
