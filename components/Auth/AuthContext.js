import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getFirestore, collection, addDoc } from '@firebase/firestore';
import { initializeApp } from '@firebase/app';
import { getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBv6GyzKHwLnZfLgCeR1FvN_w147TfyuxA",
    authDomain: "garden-app-f715b.firebaseapp.com",
    projectId: "garden-app-f715b",
    storageBucket: "garden-app-f715b.appspot.com",
    messagingSenderId: "401179222160",
    appId: "1:401179222160:web:c2bb3b5fd762dc0e8bb815",
    measurementId: "G-5HH9QQ7JT5"
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
