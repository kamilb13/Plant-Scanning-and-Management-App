import React, { useContext, useState } from "react";
import { Box, VStack, Input, Icon, Button, Text, Center, ScrollView } from "native-base";
import { Feather } from "@expo/vector-icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const { auth } = useContext(AuthContext);

    const handlePassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent 🚀");
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <ScrollView flex={1} bg="blue.50">
            <Center flex={1} px={5} py="25%">
                <Box
                    bg="white"
                    p={8}
                    borderRadius="lg"
                    shadow={6}
                    width="100%"
                    maxWidth="400px"
                >
                    <VStack space={4}>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.700" textAlign="center">
                            Forgot your password?
                        </Text>

                        <Text color="gray.600" fontSize="md" textAlign="center" mb={6}>
                            Enter your email address to receive a password reset link.
                        </Text>

                        <Input
                            placeholder="Enter email address here"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            InputLeftElement={
                                <Icon as={<Feather name="mail" />} size={5} ml={3} color="gray.400" />
                            }
                            fontSize="md"
                            bg="gray.100"
                            borderRadius="md"
                            _focus={{ borderColor: "blue.500" }}
                        />

                        <Button
                            onPress={handlePassword}
                            colorScheme="blue"
                            borderRadius="md"
                            _text={{ fontWeight: "bold", color: "white" }}
                            size="lg"
                            mt={4}
                        >
                            Send Password Reset Link
                        </Button>

                        <Text
                            fontSize="sm"
                            color="gray.500"
                            textAlign="center"
                            mt={3}
                        >
                            Check your spam folder if you don't receive the reset link.
                        </Text>
                    </VStack>
                </Box>
            </Center>
        </ScrollView>
    );
}

export default ForgotPassword;
