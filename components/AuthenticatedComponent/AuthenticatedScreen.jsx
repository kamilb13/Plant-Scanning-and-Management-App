import React, {useEffect, useState} from 'react';
import { Box, Text, Button, Center } from 'native-base';
import { View, TextInput, StyleSheet } from 'react-native';

const AuthenticatedScreen = ({ navigation, user, handleAuthentication }) => {

    return (
        <Box p={4} bg="white" borderRadius="lg" shadow={2} width="90%" alignItems="center">
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
                Welcome
            </Text>
            <Text fontSize="md" fontWeight="bold" color="blue.500" mb={4}>
                {user.email}
            </Text>
            <Button
                onPress={() => navigation.navigate('Main', {
                    handleAuthentication: handleAuthentication,
                })}
                colorScheme="blue"
                size="lg"
            >
                Continue
            </Button>
        </Box>
    );
};

export default AuthenticatedScreen;
