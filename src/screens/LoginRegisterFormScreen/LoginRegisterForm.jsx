import React, { useContext } from 'react';
import { Text, Button, Input, Box, Center, useColorMode } from 'native-base';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColors } from '../../theme/theme';

const LoginRegisterForm = ({ navigation }) => {
    const {
        handleAuthentication,
        isLogin,
        setIsLogin,
        email,
        setEmail,
        password,
        setPassword,
        setErrorMessage,
    } = useContext(AuthContext);

    //console.log(navigation);
    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);
    const backgroundColor = colors.background;
    const backgroundBox = colors.backgroundBox;
    const textColor = colors.text;
    const tabBarActiveTintColor = colors.tabBarActiveTintColor;

    return (
        <Box
            width="80%"
            maxWidth={400}
            bg="white"
            p={4}
            borderRadius="lg"
            shadow={2}
            backgroundColor={backgroundColor}
        >
            <Text
                color={textColor}
                fontSize="2xl"
                fontWeight="bold"
                mb={4}
                textAlign="center"
            >
                {isLogin ? 'Sign In' : 'Sign Up'}
            </Text>

            <Input
                color={textColor}
                variant="outline"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                mb={4}
                placeholderTextColor={textColor}
                backgroundColor={backgroundBox}
                _focus={{
                    borderColor: tabBarActiveTintColor,
                    bg: 'gray.100',
                    color: textColor,
                }}
                InputLeftElement={
                    <Ionicons
                        name="mail-outline"
                        size={20}
                        color="#c7c7c7"
                        marginLeft={10}
                    />
                }
            />

            <Input
                color={textColor}
                variant="outline"
                placeholder="Password"
                placeholderTextColor={textColor}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mb={4}
                backgroundColor={backgroundBox}
                _focus={{
                    borderColor: tabBarActiveTintColor,
                    bg: 'gray.100',
                    color: textColor,
                }}
                InputLeftElement={
                    <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#c7c7c7"
                        marginLeft={10}
                    />
                }
            />

            <Button
                onPress={() => {
                    handleAuthentication();
                    setErrorMessage('');
                }}
                bg={tabBarActiveTintColor}
                mb={4}
            >
                {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>

            <Text
                color="green.300"
                textAlign="center"
                onPress={() => setIsLogin(!isLogin)}
            >
                {isLogin
                    ? 'Need an account? Sign Up'
                    : 'Already have an account? Sign In'}
            </Text>
            {isLogin === true ? (
                <>
                    <Center>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ForgotPassword')
                            }
                        >
                            <Text color={textColor} marginTop={10}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </Center>
                </>
            ) : null}
        </Box>
    );
};

export default LoginRegisterForm;
