import React, {useContext } from 'react';
import { Box, Text, Button } from 'native-base';
import {AuthContext} from "../../contexts/AuthContext/AuthContext";
import {PlantDataContext} from "../../contexts/PlantDataContext/PlantDataContext";
import {View} from "react-native";

const AuthorizedComponent = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const { getPlantsCount } = useContext(PlantDataContext);

    if (!user) {
        return <Text>No user data available!</Text>;
    }

    return (
        <Box
            p={6}
            bg="white"
            borderRadius="lg"
            shadow={2}
            width="90%"
            alignItems="center"
            justifyContent="center"
            mx="auto"
        >
            <View style={{flexDirection: "row"}}>
                <Text fontSize="lg" fontWeight="bold" mb={3} marginRight={1}>
                    Welcome,
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="blue.500" mb={4}>
                    {user.email}
                </Text>
            </View>
            <Text fontSize="md" color="gray.600" mb={4}>
                You have added {getPlantsCount()} plants to your collection!
            </Text>
            <Button
                onPress={() => navigation.navigate('Main')}
                colorScheme="blue"
                size="lg"
                width="100%"
                mb={3}
            >
                Continue
            </Button>
        </Box>
    );
};

export default AuthorizedComponent;
