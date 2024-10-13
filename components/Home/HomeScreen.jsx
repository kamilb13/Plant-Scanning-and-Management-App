import React from 'react';
import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';

const HomeScreen = () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <Box alignItems="center">
                    <Text fontSize="4xl" fontWeight="bold" color="primary.500">
                        Home Screen
                    </Text>
                    <Text fontSize="md" color="coolGray.600" mt={2} textAlign="center">
                        Welcome to your home screen, styled with NativeBase!
                    </Text>

                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default HomeScreen;
