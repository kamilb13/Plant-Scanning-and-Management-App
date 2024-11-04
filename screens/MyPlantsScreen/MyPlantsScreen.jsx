import React, {useContext, useEffect, useState} from 'react';
import {
    NativeBaseProvider,
    Box,
    Text,
    Center,
    FlatList,
    VStack,
    Heading,
    Button,
    TextArea,
    Pressable, HStack, Badge, Spacer, Flex
} from 'native-base';
import { PlantDataContext } from "../../contexts/PlantDataContext/PlantDataContext";
import { IconButton, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from "react-native";
import Luxometer from "../../components/LuxoMeterComponent/Luxometer";

const MyPlantsScreen = () => {
    const { plants, removePlant, updatePlantNote } = useContext(PlantDataContext);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [careInstructions, setCareInstructions] = useState({});
    const [lightIntensity, setLightIntensity] = useState({});

    useEffect(() => {
        const fetchCareInstructions = async () => {
            try {
                const response = await fetch('http://192.168.33.12:3000/care-info');
                const data = await response.json();
                const instructions = data.reduce((acc, item) => {
                    acc[item.name] = item.careInstructions;
                    return acc;
                }, {});
                setCareInstructions(instructions);
            } catch (error) {
                console.error("Error fetching care instructions:", error);
            }
        };

        fetchCareInstructions();
    }, [])
    useEffect(() => {
        const fetchLightIntensity = async () => {
            try {
                const response = await fetch('http://192.168.33.12:3000/care-info');
                const data = await response.json();
                const light = data.reduce((acc, item) => {
                    acc[item.name] = item.lightIntensity;
                    return acc;
                }, {});
                setLightIntensity(light);
            } catch (error) {
                console.error("Error care light:", error);
            }
        };

        fetchLightIntensity();
    }, []);

    const plantItem = ({item, index}) => {
        return <Pressable padding={2} onPress={()=> {setSelectedPlant(item)}}>
            {({
                  isHovered,
                  isFocused,
                  isPressed
              }) => {
                return <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="3" bg={isPressed ? 'coolGray.200' : isHovered ? 'coolGray.200' : 'coolGray.100'} p="5" rounded="8" style={{
                    transform: [{
                        scale: isPressed ? 0.96 : 1
                    }]
                }}>
                    <HStack alignItems="center">
                        <Text fontSize="xl" fontWeight="medium" >{index + 1}. {item.name}</Text>

                        <Spacer />
                        <IconButton
                            icon={<Icon as={Ionicons} name="trash" size="7"  color="red.500" />}
                            onPress={() => removePlant(item.id)}
                            variant="ghost"
                            ml={1}
                        />
                    </HStack>
                    <Text color="coolGray.400" fontWeight="light" fontSize={13} mb={2}>
                        Item probability: {(item.probability*100)}%
                    </Text>
                    <TextArea
                        placeholder="Add a note..."
                        value={item.note}
                        onChangeText={(text) => updatePlantNote(item.id, text)}
                        h={10}
                    />
                </Box>;
            }}
        </Pressable>;
    }

    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                {selectedPlant ? (
                    <VStack space={4} alignItems="center" padding={4} backgroundColor="#f0f4f8" borderRadius={8} shadow={2}>
                        <Image
                            source={{ uri: selectedPlant.photo }}
                            alt={selectedPlant.name}
                            style={{ width: 300, height: 300, borderRadius: 15 }}
                            resizeMode="cover"
                        />
                        <Text fontSize="xl" fontWeight="bold" color="#333" textAlign="center">
                            {selectedPlant.name}
                        </Text>
                        <VStack space={2} alignItems="center" padding={4}>
                            {careInstructions[selectedPlant.name] ? (
                                careInstructions[selectedPlant.name].map((instruction, index) => (
                                    <Text key={index} fontSize="md" color="#555" textAlign="center">
                                        - {instruction}
                                    </Text>
                                ))
                            ) : (
                                <Text fontSize="md" color="#555" textAlign="center">
                                    Brak danych
                                </Text>
                            )}
                        </VStack>


                        <HStack space={4} alignItems="center" justifyContent="center">
                            <Center
                                borderWidth={1}
                                borderRadius={10}
                                padding={3}
                                shadow={2}
                                bgColor="lightBlue.50"
                                borderColor="blue.400"
                                alignItems="center"
                            >
                                <Text>
                                    Light intensity: {lightIntensity[selectedPlant.name] ? (lightIntensity[selectedPlant.name] + " lx") : (<Text>Brak dancyh</Text>)}
                                </Text>
                            </Center>

                                <Luxometer luxRange={lightIntensity[selectedPlant.name]}/>

                        </HStack>
                        <Button
                            onPress={() => setSelectedPlant(null)}
                            colorScheme="teal"
                            size="lg"
                            variant="solid"
                            _text={{ fontWeight: 'bold' }}
                            borderRadius={5}
                        >
                            Back to list
                        </Button>
                    </VStack>
                ) : (
                    plants.length === 0 ? (
                        <Text fontSize="2xl">You haven't added any plants yet!</Text>
                    ) : (
                        <Box alignItems="center" width="100%">
                            <FlatList
                                data={plants}
                                renderItem={plantItem}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={{ paddingBottom: 16 }}
                            />
                        </Box>
                    )
                )}
            </Center>
        </NativeBaseProvider>
    );
};

export default MyPlantsScreen;
