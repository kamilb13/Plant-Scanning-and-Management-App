import React, {useContext } from 'react';
import {Box, Text, Center, useColorMode} from 'native-base';
import AuthorizedComponent from "../../components/AuthenticatedComponent/AuthorizedComponent";
import LoginRegisterForm from "../LoginRegisterFormScreen/LoginRegisterForm";
import {AuthContext} from "../../context/AuthContext/AuthContext";
import {getColors} from "../../theme/theme";

function AuthScreen({ navigation }) {
    const { user, errorMessage } = useContext(AuthContext);
    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);
    const backgroundBox = colors.backgroundBox;
    return (
         <Center flex={1} px={4} bg={backgroundBox}>
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
