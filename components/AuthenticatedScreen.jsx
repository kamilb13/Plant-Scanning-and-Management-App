import React, {useEffect, useState} from 'react';
import { Box, Text, Button, Center } from 'native-base';
import { View, TextInput, StyleSheet } from 'react-native';

const AuthenticatedScreen = ({ navigation, user, handleAuthentication }) => {

    return (
        <>
            <Text fontSize="lg">Welcome</Text>
            <Text fontSize="md" fontWeight="bold" color="blue.500">
                {user.email}
            </Text>
            <Button onPress={() => navigation.navigate('Main',{
                     handleAuthentication: handleAuthentication,})}>
                Continue
            </Button>
        </>
        // <View >
        //     <Text>Welcome</Text>
        //     <Text>{user.email}</Text>
        //     <Button onPress={() => navigation.navigate('Main',{
        //         handleAuthentication: handleAuthentication,
        //     })} title={"Continue"} />
        // </View>
    );
};

export default AuthenticatedScreen;
