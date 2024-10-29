import React, { useContext } from 'react';
import { NativeBaseProvider, Box, Text, Center, FlatList, VStack, Heading, Button } from 'native-base';
import { PlantDataContext } from "../../contexts/PlantDataContext/PlantDataContext";

const MyPlantsScreen = () => {
    const { plants, removePlant } = useContext(PlantDataContext);

    const renderPlantItem = ({ item, index }) => (
        <Box
            borderWidth={1}
            borderColor="coolGray.300"
            borderRadius="md"
            padding={4}
            marginBottom={2}
            backgroundColor="white"
        >
            <VStack>
                <Heading size="md">
                    <Text>{index + 1}. {item.name}</Text>
                </Heading>
                <Text>Probability: {(item.probability * 100).toFixed(2)}%</Text>
                <Button onPress={() => removePlant(item.id)}>Remove Plant</Button>
            </VStack>
        </Box>
    );

    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                {plants.length === 0 ? (
                    <Text fontSize="2xl">You haven't added any plants yet!</Text>
                ) : (
                    <Box alignItems="center" width="100%">
                        <FlatList
                            data={plants}
                            renderItem={renderPlantItem}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={{ paddingBottom: 16 }}
                        />
                    </Box>
                )}
            </Center>
        </NativeBaseProvider>
    );
};

export default MyPlantsScreen;
