import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { LightSensor } from 'expo-sensors';

const Luxometer = () => {
    const [{ illuminance }, setData] = useState({ illuminance: 0 });
    const [subscription, setSubscription] = useState(null);

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

    useEffect(() => {
        subscribe();
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.sensor}>
            <Text>Light Sensor:</Text>
            <Text>
                Illuminance: {Platform.OS === 'android' ? `${illuminance} lx` : `Only available on Android`}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={toggle} style={styles.button}>
                    <Text>Toggle</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sensor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
});

export default Luxometer;
