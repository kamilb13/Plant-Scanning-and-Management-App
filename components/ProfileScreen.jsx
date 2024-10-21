import React, { useContext } from 'react';
import { NativeBaseProvider, Box, Text, Center, FlatList } from 'native-base';
import {PlantDataContext} from "./PlantDataContext/PlantDataContext";

const ProfileScreen = () => {
    const { plants } = useContext(PlantDataContext);

    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <Box alignItems="center" width="100%">
                    <Text>
                        {plants}
                    </Text>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default ProfileScreen;
