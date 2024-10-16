import React, {useEffect, useState} from 'react';
import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';
import { View, TextInput, StyleSheet } from 'react-native';

import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "@firebase/auth";
import {ScrollView} from "react-native";
import AuthenticatedScreen from "./AuthenticatedScreen";
import AuthScreen from "./AuthScreen";
import {initializeApp} from "@firebase/app";


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


function WelcomeScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);

    const [errorMessage, setErrorMessage] = useState('');


    const auth = getAuth(app);

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
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <Box alignItems="center" width="100%">
                    {errorMessage ? <Text>{errorMessage}</Text> : null}
                    {user ? (
                        <AuthenticatedScreen
                            navigation={navigation}
                            user={user}
                            handleAuthentication={handleAuthentication}
                        />
                    ) : (
                        <AuthScreen
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            isLogin={isLogin}
                            setIsLogin={setIsLogin}
                            handleAuthentication={handleAuthentication}
                        />
                    )}
                </Box>
            </Center>
        </NativeBaseProvider>


    );
}

export default WelcomeScreen;
