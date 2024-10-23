import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import MainTabs from './components/BottomNavigation/MainTabs';
import AuthScreen from "./components/AuthComponent/AuthScreen";
import CameraComponent from "./components/CameraComponent/CameraComponent";
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import {PlantDataProvider} from "./contexts/PlantDataContext/PlantDataContext";
import {LogBox} from "react-native";

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
    //!!!
    useEffect(() => {
        LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
        LogBox.ignoreLogs([
            'Non-serializable values were found in the navigation state',
        ]);
        LogBox.ignoreLogs([
            '@firebase/auth: Auth (.*): You are initializing Firebase Auth for React Native without providing AsyncStorage.',
        ]);
    }, []);

  return (
    <AuthProvider>
      {/*PlantDataProvider to na razie potem to zmienic*/}
      <PlantDataProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen name="Welcome" component={WelcomeScreen} options={optionScreen}/>

              <Stack.Screen name="Main" component={MainTabs} options={optionScreen}/>
              <Stack.Screen name="Auth" component={AuthScreen} options={optionScreen}/>

            </Stack.Navigator>
          </NavigationContainer>
      </PlantDataProvider>
    </AuthProvider>
  );
}