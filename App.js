import React, {useEffect} from 'react';
import StackNav from "./src/navigation/StackNav";
import {LogBox} from "react-native";
import { NativeBaseProvider } from "native-base";
import { ThemeProvider } from "./src/context/ThemeContext/ThemeContext";
import { AuthProvider } from './src/context/AuthContext/AuthContext';
import { PlantDataProvider } from "./src/context/PlantDataContext/PlantDataContext";

export default function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);

    }, []);

    return (
        <NativeBaseProvider>
            <AuthProvider>
                <PlantDataProvider>
                    <ThemeProvider>
                        <StackNav/>
                    </ThemeProvider>
                </PlantDataProvider>
            </AuthProvider>
        </NativeBaseProvider>
    );
}