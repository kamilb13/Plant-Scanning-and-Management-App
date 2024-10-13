import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import MainTabs from './components/MainTabs';
import RegisterScreen from "./components/RegisterScreen";
// autoryzacja
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBv6GyzKHwLnZfLgCeR1FvN_w147TfyuxA",
  authDomain: "garden-app-f715b.firebaseapp.com",
  projectId: "garden-app-f715b",
  storageBucket: "garden-app-f715b.appspot.com",
  messagingSenderId: "401179222160",
  appId: "1:401179222160:web:c2bb3b5fd762dc0e8bb815",
  measurementId: "G-5HH9QQ7JT5"
};


export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
