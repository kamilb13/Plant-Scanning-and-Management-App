import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import MainTabs from './components/BottomNavigation/MainTabs';
import LoginRegisterForm from "./components/LoginRegisterForm/LoginRegisterForm";
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import {PlantDataProvider} from "./contexts/PlantDataContext/PlantDataContext";
import {LogBox} from "react-native";
import ForgotPassword from "./components/ForgotPasswordComponent/ForgotPassword";
import {NativeBaseProvider} from "native-base";

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false
}

export default function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);

    }, []);

  return (
    <AuthProvider>
      <PlantDataProvider>
          <NavigationContainer>
              <NativeBaseProvider>
                <Stack.Navigator initialRouteName="Auth">
                  <Stack.Screen name="Auth" component={AuthScreen} options={screenOptions}/>
                  <Stack.Screen name="Main" component={MainTabs} options={screenOptions}/>
                  <Stack.Screen name="LoginRegister" component={LoginRegisterForm} options={screenOptions}/>
                  <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={screenOptions}/>
                </Stack.Navigator>
              </NativeBaseProvider>
          </NavigationContainer>
      </PlantDataProvider>
    </AuthProvider>
  );
}