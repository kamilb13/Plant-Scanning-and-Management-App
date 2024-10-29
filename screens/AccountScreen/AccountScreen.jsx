import React, { useContext } from 'react';
import { NativeBaseProvider, Box, Button, Center } from 'native-base';
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import {Alert} from "react-native";

const AccountScreen = ({ navigation }) => {
    const { handleAuthentication } = useContext(AuthContext);

    const handleLogout = () => {
        Alert.alert(
            "Logout Confirmation",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: () => {
                        handleAuthentication();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Auth' }],
                        });
                    }},
            ]
        );
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
    );
}

export default AccountScreen;
