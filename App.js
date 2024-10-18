import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import MainTabs from './components/MainTabs';
import AuthScreen from "./components/AuthScreen";
import CameraScreen from "./components/CameraScreen";

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

const optionScreen = {
    headerShown: false
}

export default function App() {

  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={optionScreen}/>

          <Stack.Screen name="Main" component={MainTabs} options={optionScreen}/>
          <Stack.Screen name="Auth" component={AuthScreen} options={optionScreen}/>

        </Stack.Navigator>
      </NavigationContainer>
  );
}