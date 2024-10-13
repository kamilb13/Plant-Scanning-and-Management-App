import React from 'react';
import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';

function WelcomeScreen({ navigation }) {
    return (
        <NativeBaseProvider>
            <Center flex={1} bg="coolGray.100" px={4}>
                <Box alignItems="center">
                    <Text fontSize="4xl" fontWeight="bold" color="primary.500" mb={4}>
                        Welcome to the App!
                    </Text>
                    <Text fontSize="md" color="coolGray.600" mb={6} textAlign="center">
                        We're excited to have you here. Click below to get started.
                    </Text>
                    <Button
                        size="lg"
                        colorScheme="primary"
                        onPress={() => navigation.navigate('Login')}
                    >
                        Get Started
                    </Button>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}

export default WelcomeScreen;
