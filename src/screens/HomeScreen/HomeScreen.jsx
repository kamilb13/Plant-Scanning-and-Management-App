import React from 'react';
import {NativeBaseProvider, Box, Text, Button, Center, useColorMode} from 'native-base';
import CameraComponent from "../../components/CameraComponent/CameraComponent";
import {getColors} from "../../theme/theme";

const HomeScreen = () => {
    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);
    const backgroundColor = colors.background;
    const textColor = colors.text;

    return (
        <Center flex={1} px={4} backgroundColor={backgroundColor}>
            <Box alignItems="center" >
                <Text
                    color={textColor}
                    fontSize="3xl"
                    fontWeight="bold"
                    textAlign="center"
                    mb={3}
                    pt={4}
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
    );
};

export default HomeScreen;