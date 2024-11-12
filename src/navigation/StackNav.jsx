import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from '../screens/AuthScreen/AuthScreen';
import BottomTabNav from './BottomTabNav';
import LoginRegister from '../screens/LoginRegisterFormScreen/LoginRegisterForm';
import ForgotPassword from '../screens/ForgotPasswordScreen/ForgotPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="Main"
                    component={BottomTabNav}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="LoginRegister"
                    component={LoginRegister}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={screenOptions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNav;
