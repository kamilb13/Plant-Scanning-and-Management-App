import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Button,
    Center,
    VStack,
    Text,
    Input,
    useColorMode,
    IconButton,
} from 'native-base';

import { Animated } from 'react-native';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColors } from '../../theme/theme';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

const AccountScreen = ({ navigation }) => {
    const { user, handleAuthentication, handleUpdatePassword, password } =
        useContext(AuthContext);
    const [newPassword, setNewPassword] = useState('');
    const [errorMessageForUpdate, setErrorMessageForUpdate] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);

    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);
    const backgroundColor = colors.background;
    const backgroundBox = colors.backgroundBox;
    const textColor = colors.text;
    const iconColor = colors.icon;
    const tabBarActiveTintColor = colors.tabBarActiveTintColor;
    const { handleToggleColorMode } = useContext(ThemeContext);

    const animationHeight = useRef(new Animated.Value(0)).current;

    const handleLogout = () => {
        Alert.alert(
            'Logout Confirmation',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    onPress: () => {
                        handleAuthentication();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Auth' }],
                        });
                    },
                },
            ]
        );
    };

    const confirmUpdatePassword = () => {
        Alert.alert(
            'Are you sure?',
            'Are you sure you want to update your password?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: updatePassword,
                },
            ]
        );
    };

    const updatePassword = async () => {
        if (
            currentPassword.length > 5 &&
            newPassword.length > 5 &&
            password === currentPassword
        ) {
            try {
                await handleUpdatePassword(
                    newPassword,
                    currentPassword,
                    setErrorMessageForUpdate
                );
                handleAuthentication();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Auth' }],
                });
            } catch (error) {
                console.log('Error updating password:', error);
            }
        } else {
            alert('Wrong password!');
        }
    };

    useEffect(() => {
        Animated.timing(animationHeight, {
            toValue: changePassword ? 200 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [changePassword, animationHeight]);

    return (
        <Center flex={1} px={4} bg={backgroundColor}>
            <VStack
                space={4}
                alignItems="center"
                mb={6}
                p={5}
                bg={backgroundBox}
                borderRadius="xl"
                shadow={2}
            >
                <Ionicons
                    color={iconColor}
                    name="person-circle-outline"
                    size={60}
                />
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    Hello
                </Text>
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                    {user?.email || 'User'}
                </Text>
                <Text
                    fontSize="sm"
                    color={textColor}
                    underline
                    onPress={() => setChangePassword(!changePassword)}
                >
                    {changePassword ? 'Cancel Edit Password' : 'Edit Password'}
                </Text>
                <Animated.View
                    style={{ height: animationHeight, overflow: 'hidden' }}
                >
                    {changePassword && (
                        <VStack
                            space={3}
                            alignItems="center"
                            padding={3}
                            width={280}
                        >
                            <Input
                                placeholder="Current Password"
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                type="password"
                                width="80%"
                                bg="gray.100"
                                borderRadius="lg"
                                mt={2}
                                placeholderTextColor={textColor}
                                backgroundColor={backgroundBox}
                                _focus={{
                                    borderColor: '#3b82f6',
                                    bg: 'gray.100',
                                    color: textColor,
                                }}
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
                                placeholderTextColor={textColor}
                                backgroundColor={backgroundBox}
                                _focus={{
                                    borderColor: '#3b82f6',
                                    bg: 'gray.100',
                                    color: textColor,
                                }}
                            />
                            <Button
                                bg={tabBarActiveTintColor}
                                onPress={confirmUpdatePassword}
                                shadow={1}
                            >
                                Update Password
                            </Button>
                        </VStack>
                    )}
                    {errorMessageForUpdate && (
                        <Text color="red.500" mt={2}>
                            {errorMessageForUpdate}
                        </Text>
                    )}
                </Animated.View>
                <IconButton
                    icon={
                        <Ionicons
                            name={colorMode === 'light' ? 'sunny' : 'moon'}
                            size={24}
                            color="gray"
                        />
                    }
                    onPress={handleToggleColorMode}
                    borderRadius="full"
                    bg="gray.200"
                    _pressed={{
                        bg: 'gray.300',
                    }}
                />
            </VStack>
            <Button.Group space={3} mt={5}>
                <Button
                    bg="red.600"
                    onPress={handleLogout}
                    width="40%"
                    borderRadius="lg"
                    shadow={1}
                >
                    Logout
                </Button>
            </Button.Group>
        </Center>
    );
};

export default AccountScreen;
