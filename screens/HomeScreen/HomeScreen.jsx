import React from 'react';
import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';
import CameraComponent from "../../components/CameraComponent/CameraComponent";

const HomeScreen = () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <Box alignItems="center" >
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        color="primary.500"
                        textAlign="center"
                        mb={6}
                        textShadow={{
                            color: 'gray.600',
                            offset: { width: 1, height: 1 },
                            radius: 2,
                            opacity: 0.7,
                        }}
                    >
                        Take a photo of plant!
                    </Text>
                    <CameraComponent />
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default HomeScreen;
