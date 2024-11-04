import React, { useState } from 'react';
import {Platform} from 'react-native';
import { LightSensor } from 'expo-sensors';
import { Text, Box } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const Luxometer = ({luxRange}) => {
    const [{ illuminance }, setData] = useState({ illuminance: 0 });
    const [subscription, setSubscription] = useState(null);

    const [minValue, maxValue] = luxRange.split('-').map(Number);
    console.log(minValue + " " +maxValue)
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
            bgColor={
                Number(illuminance.toFixed(0)) < minValue
                    ? "#eddd51"
                    : Number(illuminance.toFixed(0)) > maxValue
                        ? "#9e2318"
                        : "#2bc48f"
            }            borderColor="blue.400"
            alignItems="center"
        >
            {subscription ? (
                <>
                    <Text
                        onPress={toggle}
                        fontSize="xl"
                        fontWeight="bold"
                    >
                        {Platform.OS === 'android' ? `${illuminance.toFixed(0)} lx` : `Only available on Android`}
                    </Text>
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
