import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../AuthContext/AuthContext";
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove  } from "firebase/firestore";
export const PlantDataContext = createContext();

export const PlantDataProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    const {db, user} = useContext(AuthContext);

    const addPlant = async (newPlant) => {
        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef); // Sprawdź, czy dokument istnieje

            if (!userDoc.exists()) {
                console.error("Dokument użytkownika nie istnieje!");
                return; // Zakończ, jeśli dokument nie istnieje
            }
            await updateDoc(userDocRef, {
                plants: arrayUnion({
                    ...newPlant,
                    createdAt: new Date().toISOString(),
                })
            });

            console.log("Roślina dodana do bazy danych");

            const newPlants = [...plants, newPlant];
            setPlants(newPlants);
        } catch (error) {
            console.error("Błąd przy dodawaniu rośliny: ", error);
        }
    };

    const removePlant = async (id) => {
        try {
            const updatedPlants = plants.filter(plant => plant.id !== id);

            // Usunięcie rośliny z Firestore
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                plants: arrayRemove({ id }) // Upewnij się, że id jest jedynym kluczem, aby usunięcie działało
            });

            setPlants(updatedPlants);
            console.log("Roślina usunięta z bazy danych i stanu");
        } catch (error) {
            console.error("Błąd przy usuwaniu rośliny: ", error);
        }
    };

    const updatePlantNote = async (id, note) => {
        try {
            const updatedPlants = plants.map(plant =>
                plant.id === id ? { ...plant, note } : plant
            );

            // Zaktualizowanie rośliny w Firestore
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                plants: updatedPlants // Zaktualizuj całą tablicę roślin lub użyj arrayUnion dla pojedynczego elementu
            });

            setPlants(updatedPlants);
            console.log("Notatka rośliny zaktualizowana w bazie danych i stanie");
        } catch (error) {
            console.error("Błąd przy aktualizacji notatki rośliny: ", error);
        }
    };

    const getPlantsCount = () => {
        return plants.length;
    }

    useEffect(() => {
        const fetchPlants = async () => {
            if (!user || !user.uid) {
                return;
            }

            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    console.log("user docs: ", userDoc.data());
                    const userPlants = userDoc.data().plants || [];
                    console.log("user plants: ", userPlants);
                    setPlants(userPlants);
                } else {
                    console.log("user docs doesnt exist");
                }
            } catch (error) {
                console.error("error: ", error);
            }
        };

        fetchPlants().then(() => console.log("data fetch"));
    }, [user]);


    return (
        <PlantDataContext.Provider value={{ plants, setPlants, addPlant, removePlant, getPlantsCount, updatePlantNote  }}>
            {children}
        </PlantDataContext.Provider>
    );
};
