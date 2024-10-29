import React, { createContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth, getReactNativePersistence, initializeAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from '@firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from '@firebase/firestore';
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from '@firebase/app';
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    console.log(FIREBASE_API_KEY)

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUser(user);
    //         } else {
    //             setUser(null);
    //         }
    //     });
    //
    //     return () => unsubscribe();
    // }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);

    console.log("USER(null)",user);

    const handleAuthentication = async () => {

        try {
            if (user) {
                await signOut(auth);
                console.log('User logged out successfully!');
                setUser(null);
            } else {
                if (isLogin) {
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log('User signed in successfully!');
                    //setIsLogin(!isLogin);
                } else {
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log('User created successfully!');
                }
            }
        } catch (error) {
            switch (error.code){
                case 'auth/invalid-email':
                    setErrorMessage('Invalid email format.');
                    break;
                case 'auth/user-not-found':
                    setErrorMessage('User not found. Please register.');
                    break;
                case 'auth/wrong-password':
                    setErrorMessage('Incorrect password. Please try again.');
                    break;
                case 'auth/email-already-in-use':
                    setErrorMessage('This email is already in use. Please log in.');
                    break;
                case 'auth/invalid-credential':
                    setErrorMessage('Invalid cridencial.');
                    break;
                default:
                    setErrorMessage('Authentication error: ' + error.message);
                    console.log(error.code)
            }
        }
    };
    return (
        <AuthContext.Provider value={{ user, db, auth, handleAuthentication, isLogin, setIsLogin, email, setEmail, password, setPassword, errorMessage,setErrorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};
