import React, { useContext, useState } from 'react';
import {
    NativeBaseProvider,
    Button,
    Center,
    VStack,
    Text,
    AlertDialog,
    Input,
    Box,
    useColorMode,
    useColorModeValue, IconButton
} from 'native-base';

import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {getColors} from "../../theme/theme";

const AccountScreen = ({ navigation }) => {
    const { user, handleAuthentication, handleUpdatePassword } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');
    const [errorMessageForUpdate, setErrorMessageForUpdate] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);

    const { toggleColorMode, colorMode } = useColorMode();
    const colors = getColors(colorMode);
    const backgroundColor = colors.background;
    const backgroundBox = colors.backgroundBox;
    const textColor = colors.text;
    const iconColor = colors.icon;

    console.log("Background Color:", backgroundColor);
    console.log("Text Color:", textColor);
    console.log("Icon Color:", iconColor);

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


    const updatePassword = async () => {
        try {
            await handleUpdatePassword(newPassword, currentPassword, setShowSuccess, setErrorMessageForUpdate);
            handleAuthentication();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
            });
        } catch (error) {
            console.log("Error updating password:", error);
        }
    };


    return (
        <Center flex={1} px={4} bg={backgroundColor}>
            <VStack space={4} alignItems="center" mb={6} p={5} bg={backgroundBox} borderRadius="xl" shadow={2}>
                <Ionicons color={iconColor} name="person-circle-outline" size={60}/>
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    Hello, {user?.email || "User"}
                </Text>
                <Text
                    fontSize="sm"
                    color={textColor}
                    underline
                    onPress={() => setChangePassword(!changePassword)}
                >
                    {changePassword ? "Cancel Edit Password" : "Edit Password"}
                </Text>
                {changePassword && (
                    <>
                        <Input
                            placeholder="Current Password"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            type="password"
                            width="80%"
                            bg="gray.100"
                            borderRadius="lg"
                            mt={2}
                        />
                        <Input
                            placeholder="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            type="password"
                            width="80%"
                            bg="gray.100"
                            borderRadius="lg"
                            mt={2}
                        />
                        <Button colorScheme="blue" onPress={updatePassword} shadow={1}>
                            Update Password
                        </Button>
                    </>
                )}
                {errorMessageForUpdate && (
                    <Text color="red.500" mt={2}>
                        {errorMessageForUpdate}
                    </Text>
                )}
                <AlertDialog isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
                    <AlertDialog.Content>
                        <AlertDialog.Header>Success</AlertDialog.Header>
                        <AlertDialog.Body>Account details updated successfully!</AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button onPress={() => setShowSuccess(false)}>OK</Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
                <IconButton
                    icon={<Ionicons name={colorMode === "light" ? "sunny" : "moon"} size={24} color="gray" />}
                    onPress={toggleColorMode}
                    borderRadius="full"
                    bg="gray.200"
                    _pressed={{
                        bg: 'gray.300',
                    }}
                />
            </VStack>
            <Button.Group space={3} mt={5}>
                <Button bg="red.600" onPress={handleLogout} width="40%" borderRadius="lg" shadow={1}>
                    Logout
                </Button>
            </Button.Group>
        </Center>
    );
}

export default AccountScreen;
