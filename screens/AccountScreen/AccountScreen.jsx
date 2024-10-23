import React from 'react';
import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';

const AccountScreen = ( { route, navigation} ) => {
    const { handleAuthentication } = route.params;

    const handleLogout = () => {
        handleAuthentication();
        navigation.reset({
            index: 0,
            // routes: [{name: 'Auth'}],
            routes: [{name: 'Welcome'}],
        })
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <Box alignItems="center">
                    <Button bg="red.600" onPress={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}

export default AccountScreen;