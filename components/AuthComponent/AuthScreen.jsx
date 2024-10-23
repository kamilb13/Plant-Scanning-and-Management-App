import React from "react";
import { NativeBaseProvider, View, Text, Button, Center, Input, Box } from 'native-base';

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
    return (
        <Box width="80%" maxWidth={400} bg="white" p={4} borderRadius="lg" shadow={2}>
            <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
                {isLogin ? 'Sign In' : 'Sign Up'}
            </Text>

            <Input
                variant="outline"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                mb={4}
            />
            <Input
                variant="outline"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mb={4}
            />

            <Button
                onPress={handleAuthentication}
                colorScheme="blue"
                mb={4}
            >
                {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>

            <Text
                color="blue.500"
                textAlign="center"
                onPress={() => setIsLogin(!isLogin)}
            >
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Text>
        </Box>
    );
};

export default AuthScreen;
