import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

interface PlantInfoProps {
    plantName: string;
    probability: number;
    onRetake: () => void;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ plantName, probability, onRetake }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rozpoznano roślinę:</Text>
            <Text style={styles.plantName}>{plantName}</Text>
            <Text style={styles.probability}>Prawdopodobieństwo: {probability.toFixed(2)}%</Text>
            <Button title="Zrób zdjęcie ponownie" onPress={onRetake} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    plantName: {
        fontSize: 20,
        marginVertical: 10,
    },
    probability: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default PlantInfo;
