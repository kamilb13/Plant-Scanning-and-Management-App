import React from 'react';
import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';
import CameraScreen from "../CameraScreen";

const HomeScreen = () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <Box alignItems="center">
                    <Text fontSize="4xl" fontWeight="bold" color="primary.500">
                        Home Screen
                    </Text>
                    <CameraScreen />


                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default HomeScreen;
