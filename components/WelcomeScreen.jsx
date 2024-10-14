import React, {useEffect, useState} from 'react';
//import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
        <ScrollView contentContainerStyle={styles.container}>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
        </ScrollView>
    );
}

    // return (
    //     <NativeBaseProvider>
    //         <Center flex={1} bg="coolGray.100" px={4}>
    //             <Box alignItems="center">
    //                 <Text fontSize="4xl" fontWeight="bold" color="primary.500" mb={4}>
    //                     Welcome to the App!
    //                 </Text>
    //                 <Text fontSize="md" color="coolGray.600" mb={6} textAlign="center">
    //                     We're excited to have you here. Click below to get started.
    //                 </Text>
    //                 <Button
    //                     size="lg"
    //                     colorScheme="primary"
    //                     onPress={() => navigation.navigate('Login')} //AuthScreen
    //                 >
    //                     Get Started
    //                 </Button>
    //             </Box>
    //         </Center>
    //     </NativeBaseProvider>
    // );


export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});