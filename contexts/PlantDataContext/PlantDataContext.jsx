import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PlantDataContext = createContext();

export const PlantDataProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);

    const addPlant = (newPlant) => {
        console.log("nowa roslina " + JSON.stringify(newPlant))
        const newPlants = [...plants, newPlant]
        setPlants(newPlants);
        storePlants(newPlants);
    };

    const removePlant = (id) => {
        const updatedPlants = plants.filter(plant => plant.id !== id);
        setPlants(updatedPlants);
        storePlants(updatedPlants);
    };

    const updatePlantNote = (id, note) => {
        const updatedPlants = plants.map(plant =>
            plant.id === id ? { ...plant, note } : plant
        );
        setPlants(updatedPlants);
        storePlants(updatedPlants);
    };

    const getPlants = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@plants_key');
            return jsonValue!=null ? JSON.parse(jsonValue) : [];
        }catch (e){
            console.log('Blad odczytu' + e);
        }
    }

    const getPlantsCount = () => {
        return plants.length;
    }

    const storePlants = async (plants) => {
        console.log("Rosliny ")
        console.log(plants)
        try {
            const jsonValue = JSON.stringify(plants);
            await AsyncStorage.setItem('@plants_key', jsonValue);
            console.log('Udalo sie zapisac rosliny');
        }catch (e){
            console.log('Blad zapisu' + e);
        }
    };

    useEffect(() => {

        const fetchPlants = async () => {
            const storedPlants = await getPlants();
            setPlants(storedPlants);
        };
        fetchPlants();
    }, [])

    return (
        <PlantDataContext.Provider value={{ plants, setPlants, addPlant, removePlant, storePlants, getPlants, getPlantsCount, updatePlantNote  }}>
            {children}
        </PlantDataContext.Provider>
    );
};
