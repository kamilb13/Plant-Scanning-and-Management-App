import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Text,
    Center,
    FlatList,
    VStack,
    Button,
    TextArea,
    Pressable,
    HStack,
    Spacer,
    useColorMode,
} from 'native-base';
import { PlantDataContext } from '../../context/PlantDataContext/PlantDataContext';
import { IconButton, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import Luxometer from '../../components/LuxoMeterComponent/Luxometer';
import { getColors } from '../../theme/theme';

const MyPlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [careInstructions, setCareInstructions] = useState({});
    const [lightIntensity, setLightIntensity] = useState({});
    const [notes] = useState({});
    const [plantsNotes, setPlantsNotes] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlants, setFilteredPlants] = useState([]);

    const { plants, removePlant, updatePlantNote } =
        useContext(PlantDataContext);

    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);
    const backgroundColor = colors.background;
    const backgroundBox = colors.backgroundBox;
    const textColor = colors.text;

    const tabBarActiveTintColor = colors.tabBarActiveTintColor;

    useEffect(() => {
        setFilteredPlants(plants);
    }, [plants]);

    const handleSearchChange = (text) => {
        setSearchQuery(text);
        setFilteredPlants(
            plants.filter((plant) =>
                plant.name.toLowerCase().includes(text.toLowerCase())
            )
        );
    };

    useEffect(() => {
        setPlantsNotes(
            plants.map((plant) => ({
                id: plant.id,
                note: plant.note || '',
            }))
        );
    }, [notes, plants]);

    const handleNoteChange = (id, text) => {
        setPlantsNotes((prevPlantNotes) =>
            prevPlantNotes.map((note, index) =>
                plants[index].id === id ? { ...note, note: text } : note
            )
        );
    };

    const updatePlantNoteLocally = (id, newNote) => {
        updatePlantNote(id, newNote);
        alert("Plant's note successfully added.");
    };

    useEffect(() => {
        const fetchCareInstructions = async () => {
            try {
                const response = await fetch(
                    'http://192.168.33.9:3000/care-info'
                );
                const data = await response.json();
                const instructions = data.reduce((acc, item) => {
                    acc[item.name] = item.careInstructions;
                    return acc;
                }, {});
                setCareInstructions(instructions);
            } catch (error) {
                console.error('Error fetching care instructions:', error);
            }
        };

        fetchCareInstructions();
    }, []);

    useEffect(() => {
        const fetchLightIntensity = async () => {
            try {
                const response = await fetch(
                    'http://192.168.33.9:3000/care-info'
                );
                const data = await response.json();
                const light = data.reduce((acc, item) => {
                    acc[item.name] = item.lightIntensity;
                    return acc;
                }, {});
                setLightIntensity(light);
            } catch (error) {
                console.error('Error care light:', error);
            }
        };

        fetchLightIntensity();
    }, []);

    const plantItem = ({ item, index }) => {
        return (
            <Pressable
                padding={2}
                onPress={() => {
                    setSelectedPlant(item);
                }}
            >
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box
                            maxW="96"
                            shadow="3"
                            bg={
                                isPressed
                                    ? 'coolGray.200'
                                    : isHovered
                                      ? 'coolGray.200'
                                      : 'coolGray.100'
                            }
                            p="5"
                            rounded="8"
                            style={{
                                backgroundColor: backgroundBox,
                                transform: [{ scale: isPressed ? 0.96 : 1 }],
                            }}
                        >
                            <HStack alignItems="center">
                                <Text
                                    color={textColor}
                                    fontSize="xl"
                                    fontWeight="medium"
                                >
                                    {index + 1}. {item.name}
                                </Text>
                                <Spacer />
                                <IconButton
                                    icon={
                                        <Icon
                                            as={Ionicons}
                                            name="trash"
                                            size="7"
                                            color="red.500"
                                        />
                                    }
                                    onPress={() => removePlant(item.id)}
                                    variant="ghost"
                                    ml={1}
                                />
                            </HStack>
                            <Text
                                color="coolGray.400"
                                fontWeight="light"
                                fontSize={13}
                                mb={2}
                            >
                                Item probability: {item.probability * 100}%
                            </Text>
                            <HStack alignItems="center" space={2}>
                                <TextArea
                                    placeholder="Add a note..."
                                    value={plantsNotes[item.id]?.note}
                                    onChangeText={(text) =>
                                        handleNoteChange(item.id, text)
                                    }
                                    h={10}
                                    flex={1}
                                    placeholderTextColor={textColor}
                                    backgroundColor={backgroundBox}
                                    _focus={{
                                        borderColor: tabBarActiveTintColor,
                                        bg: 'gray.100',
                                        color: textColor,
                                    }}
                                />
                                <IconButton
                                    icon={
                                        <Icon
                                            as={Ionicons}
                                            name="add"
                                            size="5"
                                            color="blue.500"
                                        />
                                    }
                                    onPress={() =>
                                        updatePlantNoteLocally(
                                            item.id,
                                            plantsNotes[item.id].note
                                        )
                                    }
                                    variant="ghost"
                                    _pressed={{ bg: 'gray.200' }}
                                />
                            </HStack>
                        </Box>
                    );
                }}
            </Pressable>
        );
    };
    //console.log(plants)
    return (
        <Center flex={1} px={4} backgroundColor={backgroundColor}>
            {selectedPlant ? (
                <VStack
                    space={4}
                    alignItems="center"
                    padding={4}
                    backgroundColor={backgroundColor}
                    borderRadius={8}
                    shadow={2}
                >
                    <Image
                        source={{ uri: selectedPlant.photo }}
                        alt={selectedPlant.name}
                        style={{ width: 300, height: 300, borderRadius: 15 }}
                        resizeMode="cover"
                    />
                    <Text fontSize="xl" fontWeight="bold" textAlign="center">
                        {selectedPlant.name}
                    </Text>
                    <VStack space={1} alignItems="center" padding={3}>
                        {careInstructions[selectedPlant.name] ? (
                            careInstructions[selectedPlant.name].map(
                                (instruction, index) => (
                                    <Text
                                        key={index}
                                        fontSize="sm"
                                        textAlign="center"
                                    >
                                        - {instruction}
                                    </Text>
                                )
                            )
                        ) : (
                            <Text fontSize="md" color="#555" textAlign="center">
                                No data
                            </Text>
                        )}
                    </VStack>

                    <HStack
                        space={4}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Center
                            borderWidth={1}
                            borderRadius={10}
                            padding={3}
                            shadow={2}
                            bgColor="lightBlue.50"
                            borderColor="blue.400"
                            alignItems="center"
                        >
                            <Text color="gray.700">
                                Light intensity:{' '}
                                {lightIntensity[selectedPlant.name] ? (
                                    lightIntensity[selectedPlant.name] + ' lx'
                                ) : (
                                    <Text>No data</Text>
                                )}
                            </Text>
                        </Center>

                        <Luxometer
                            luxRange={lightIntensity[selectedPlant.name]}
                        />
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
            ) : plants.length === 0 ? (
                <Text fontSize="2xl">You haven't added any plants yet!</Text>
            ) : (
                <Box alignItems="center" width="100%" flex={1}>
                    <TextArea
                        placeholder="Search plant"
                        value={searchQuery}
                        onChangeText={handleSearchChange}
                        h={10}
                        mt={4}
                        mb={4}
                        fontSize={15}
                        placeholderTextColor={textColor}
                        backgroundColor={backgroundBox}
                        _focus={{
                            borderColor: tabBarActiveTintColor,
                            bg: 'gray.100',
                            color: textColor,
                        }}
                    />
                    <FlatList
                        data={filteredPlants}
                        renderItem={plantItem}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        contentContainerStyle={{ paddingBottom: 16 }}
                    />
                </Box>
            )}
        </Center>
    );
};

export default MyPlants;
