import React, {useEffect} from 'react';
import { AuthProvider } from './src/context/AuthContext/AuthContext';
import {PlantDataProvider} from "./src/context/PlantDataContext/PlantDataContext";
import StackNav from "./src/navigation/StackNav";
import {LogBox} from "react-native";
import { NativeBaseProvider } from "native-base";

export default function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);

    }, []);

  return (
    <AuthProvider>
      <PlantDataProvider>
          <NativeBaseProvider>
            <StackNav/>
          </NativeBaseProvider>
      </PlantDataProvider>
    </AuthProvider>
  );
}