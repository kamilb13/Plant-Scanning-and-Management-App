import React, {useState} from 'react';
import { NativeBaseProvider, Box, Text, Input, Button, VStack, FormControl } from 'native-base';

const checkLogin = (navigation) => {
    // logika sprawdzenia logowania
    // ...
    // if(){
    //     navigation.navigate('Main')
    // }

    navigation.navigate('Main');  // Przejście na MainScreen po udanym logowaniu
}

const handleLogin = async () => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
        navigation.navigate('Main'); // Przechodzimy do głównej aplikacji
    } catch (error) {
        console.error(error);
        alert(error.message); // Wyświetl błąd
    }
};

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <NativeBaseProvider>
            <Box flex={1} justifyContent="center" alignItems="center" bg="coolGray.100" p={4}>
                <VStack space={4} width="100%" maxWidth={400}>
                    <Text fontSize="2xl" fontWeight="bold" color="primary.500" textAlign="center">
                        Login
                    </Text>

                    <FormControl>
                        <FormControl.Label>Username</FormControl.Label>
                        <Input
                            variant="filled"
                            bg="white"
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={{ marginBottom: 10, borderBottomWidth: 1 }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            variant="filled"
                            bg="white"
                            placeholder="Password"
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                            style={{ marginBottom: 20, borderBottomWidth: 1 }}
                        />
                    </FormControl>

                    <Button colorScheme="primary" onPress={() => checkLogin(navigation)}>
                        Login
                    </Button>
                    <Text style={{ marginTop: 20 }} onPress={() => navigation.navigate('Register')}>
                        Don't have an account? Register here.
                    </Text>
                </VStack>
            </Box>
        </NativeBaseProvider>
    );
}

export default LoginScreen;
