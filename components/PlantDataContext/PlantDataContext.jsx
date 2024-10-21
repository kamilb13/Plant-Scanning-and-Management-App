import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';



export const PlantDataContext = createContext();


export const PlantDataProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);


    const addPlant = (newPlant) => {
        setPlants([...plants, newPlant])
    };



    return (
        <PlantDataContext.Provider value={{ plants, setPlants, addPlant }}>
            {children}
        </PlantDataContext.Provider>
    );
};
