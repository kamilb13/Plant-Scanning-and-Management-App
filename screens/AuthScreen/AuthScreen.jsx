import React, {useContext } from 'react';
import { Box, Text, Center } from 'native-base';
import AuthorizedComponent from "../../components/AuthenticatedComponent/AuthorizedComponent";
import LoginRegisterForm from "../../components/LoginRegisterForm/LoginRegisterForm";
import {AuthContext} from "../../contexts/AuthContext/AuthContext";

function AuthScreen({ navigation }) {
    const { user, errorMessage } = useContext(AuthContext);

    return (
         <Center flex={1} px={4}>
             <Box alignItems="center" width="100%">
                 {user ? (
                     <AuthorizedComponent
                         navigation={navigation}
                     />
                 ) : (
                     <>
                         {errorMessage ? <Text>{errorMessage}</Text> : null}
                         <LoginRegisterForm
                             navigation={navigation}
                         />
                     </>
                 )}
             </Box>
         </Center>
    );
}

export default AuthScreen;
