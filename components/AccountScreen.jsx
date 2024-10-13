import React from 'react';
import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';

const AccountScreen = ( {navigation} ) => {

    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <Box alignItems="center">
                    <Button colorScheme="primary" >
                        Log out
                    </Button>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}

export default AccountScreen;