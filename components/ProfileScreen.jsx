import React from 'react';
import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';

const ProfileScreen = () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <Box alignItems="center">
                    <Text fontSize="4xl"  color="primary.500">
                        Profile Screen
                    </Text>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}

export default ProfileScreen;