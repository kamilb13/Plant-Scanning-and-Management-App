import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getFirestore, collection, addDoc } from '@firebase/firestore';
import { initializeApp } from '@firebase/app';
import { getDocs } from "firebase/firestore";

const firebaseConfig = {
    ...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{ user, db, auth }}>
            {children}
        </AuthContext.Provider>
    );
};
