import React, { useContext, useState } from 'react';
import { NativeBaseProvider, Box, Button, Center, VStack, Text, AlertDialog, Input } from 'native-base';
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const AccountScreen = ({ navigation }) => {
    const { user, handleAuthentication, handleUpdatePassword } = useContext(AuthContext);
    const [newEmail, setNewEmail] = useState(user?.email || '');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessageForUpdate, setErrorMessageForUpdate] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);

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
        <NativeBaseProvider>
            <Center flex={1} px={4} bg="#fff">
                <VStack space={4} alignItems="center" mb={6} p={5} bg="white" borderRadius="xl" shadow={2}>
                    <Ionicons name="person-circle-outline" size={60} color="#000" />
                    <Text fontSize="2xl" fontWeight="bold" color="#000">
                        Hello, {user?.email || "User"}
                    </Text>
                    <Text
                        fontSize="sm"
                        color="blue.500"
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
                </VStack>

                <Button.Group space={3} mt={5}>
                    <Button bg="red.600" onPress={handleLogout} width="40%" borderRadius="lg" shadow={1}>
                        Logout
                    </Button>
                </Button.Group>
            </Center>
        </NativeBaseProvider>
    );
}

export default AccountScreen;
