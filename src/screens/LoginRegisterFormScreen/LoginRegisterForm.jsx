import React, {useContext} from "react";
import {Text, Button, Input, Box, Center} from 'native-base';
import {AuthContext} from "../../context/AuthContext/AuthContext";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const LoginRegisterForm = ({ navigation }) => {
    const { handleAuthentication } = useContext(AuthContext);
    const { isLogin, setIsLogin } = useContext(AuthContext);
    const { email, setEmail } = useContext(AuthContext);
    const { password, setPassword } = useContext(AuthContext);
    console.log(navigation);
    return (
        <Box width="80%" maxWidth={400} bg="white" p={4} borderRadius="lg" shadow={2}>
            <Text color="#000" fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
                {isLogin ? 'Sign In' : 'Sign Up'}
            </Text>

            <Input
                color="#000"
                variant="outline"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                mb={4}
                _focus={{
                    borderColor: "#3b82f6",
                    bg: "gray.100"
                }}
                InputLeftElement={
                    <Ionicons name="mail-outline" size={20} color="#c7c7c7" marginLeft={10}/>
            }
            />

            <Input
                color="#000"
                variant="outline"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mb={4}
                _focus={{
                    borderColor: "#3b82f6",
                    bg: "gray.100"
                }}
                InputLeftElement={
                    <Ionicons name="lock-closed-outline" size={20} color="#c7c7c7" marginLeft={10}/>
                }
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
            {isLogin === true ?
                <>
                    <Center>
                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                            <Text color="#000" marginTop={10}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </Center>
                </>
            : null}
        </Box>
    );
};

export default LoginRegisterForm;
