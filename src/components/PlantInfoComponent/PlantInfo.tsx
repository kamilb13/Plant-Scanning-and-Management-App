import React from 'react';
import { Text, Button, Center, useColorMode } from 'native-base';
import { getColors } from '../../theme/theme';

interface PlantInfoProps {
    plantName: string;
    probability: number;
    onRetake: () => void;
}

const PlantInfo: React.FC<PlantInfoProps> = ({
    plantName,
    probability,
    onRetake,
}) => {
    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);
    const textColor = colors.text;

    return (
        <Center>
            {/*<Text color={textColor}>Plant recognized:</Text>*/}
            <Text color={textColor} fontSize={22} mt={4}>
                {plantName}
            </Text>
            <Text color="gray.400" mt={4}>
                Probability: {(probability * 100).toFixed(2)}%
            </Text>
            <Button onPress={onRetake} mt={4} bg="green.500">
                Take photo again
            </Button>
        </Center>
    );
};

export default PlantInfo;
