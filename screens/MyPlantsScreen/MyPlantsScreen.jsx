import React, { useContext } from 'react';
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

const MyPlantsScreen = () => {
    const { plants, removePlant, updatePlantNote } = useContext(PlantDataContext);

    const plantItem = ({item, index}) => {
        return <Pressable padding={2}>
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
                    {/*<Text color="coolGray.800" mt="3" fontWeight="light" fontSize="sm">*/}
                    {/*    Add description*/}
                    {/*</Text>*/}
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
                {plants.length === 0 ? (
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
                )}
            </Center>
        </NativeBaseProvider>
    );
};

export default MyPlantsScreen;
