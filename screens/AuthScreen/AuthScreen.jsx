import React, {useContext } from 'react';
import { NativeBaseProvider, Box, Text, Center } from 'native-base';
import AuthorizedComponent from "../../components/AuthenticatedComponent/AuthorizedComponent";
import LoginRegisterForm from "../../components/LoginRegisterForm/LoginRegisterForm";
import {AuthContext} from "../../contexts/AuthContext/AuthContext";

function AuthScreen({ navigation }) {
    const { user, errorMessage } = useContext(AuthContext);

    return (
        <NativeBaseProvider>
            <Center flex={1} px={4}>
                <Box alignItems="center" width="100%">
                    {user ? (
                        <AuthorizedComponent
                            navigation={navigation}
                        />
                    ) : (
                        <>
                            {errorMessage ? <Text>{errorMessage}</Text> : null}
                            <LoginRegisterForm/>
                        </>
                    )}
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}

export default AuthScreen;
