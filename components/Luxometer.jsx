import React, { useEffect, useState } from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { LightSensor } from 'expo-sensors';
import { Button, Text, Box, Center, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
//import {MaterialIcons} from "@expo/vector-icons";

const Luxometer = ({luxRange}) => {
    const [{ illuminance }, setData] = useState({ illuminance: 0 });
    const [subscription, setSubscription] = useState(null);

    const [minValue, maxValue] = luxRange.split('-').map(Number);

    const toggle = () => {
        if (subscription) {
            unsubscribe();
        } else {
            subscribe();
        }
    };

    const subscribe = () => {
        setSubscription(
            LightSensor.addListener(sensorData => {
                setData(sensorData);
            })
        );
    };

    const unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    // useEffect(() => {
    //     //subscribe();
    //     return () => unsubscribe();
    // }, []);

    return (
        <Box
            borderWidth={1}
            borderRadius={10}
            padding={3}
            shadow={2}
            bgColor="#eced98"
            borderColor="blue.400"
            alignItems="center"
        >
            {subscription ? (
                <>
                    <Text onPress={toggle} fontSize="xl" fontWeight="bold" color="blue.800">
                        {/*Illuminance:*/}
                        {Platform.OS === 'android' ? `${illuminance.toFixed(0)} lx` : `Only available on Android`}
                    </Text>
                    {/*<Button*/}
                    {/*    leftIcon={<Ionicons as={Ionicons} name="bulb-outline" size={20} />}*/}
                    {/*    colorScheme="red"*/}
                    {/*    onPress={toggle}*/}
                    {/*    marginTop={2}*/}
                    {/*>*/}
                    {/*    Stop*/}
                    {/*</Button>*/}
                </>
            ) : (
                <>
                    <Text onPress={toggle} fontSize="lg" color="gray.700">Check it!
                        <Ionicons as={Ionicons} name="bulb-outline" size={20} />
                    </Text>
                </>
            )}
        </Box>
    );
};

export default Luxometer;
