import React, { useContext } from 'react';
import { Box, Text, Button, useColorMode } from 'native-base';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { PlantDataContext } from '../../context/PlantDataContext/PlantDataContext';
import { View } from 'react-native';
import { getColors } from '../../theme/theme';

const Authenticated = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const { getPlantsCount } = useContext(PlantDataContext);

    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);
    const backgroundColor = colors.background;
    const textColor = colors.text;
    const tabBarActiveTintColor = colors.tabBarActiveTintColor;

    if (!user) {
        return <Text>No user data available!</Text>;
    }

    return (
        <Box
            p={6}
            bg={backgroundColor}
            borderRadius="lg"
            shadow={2}
            width="90%"
            alignItems="center"
            justifyContent="center"
            mx="auto"
        >
            <View style={{ flexDirection: 'row' }}>
                {/*<Text color={textColor} fontSize="lg" fontWeight="bold" mb={3} marginRight={1}>*/}
                {/*    Hi!*/}
                {/*</Text>*/}
                <Text fontSize="lg" fontWeight="bold" color="green.300" mb={4}>
                    {user.email}
                </Text>
            </View>
            <Text fontSize="md" color={textColor} mb={4}>
                You have added {getPlantsCount()} plants to your collection!
            </Text>
            <Button
                onPress={() => navigation.navigate('Main')}
                bg={tabBarActiveTintColor}
                size="lg"
                width="100%"
                mb={3}
            >
                Continue
            </Button>
        </Box>
    );
};

export default Authenticated;
