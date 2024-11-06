import React, {useContext } from 'react';
import {Box, Text, Center, useColorMode} from 'native-base';
import AuthorizedComponent from "../../components/AuthenticatedComponent/AuthorizedComponent";
import LoginRegisterForm from "../LoginRegisterFormScreen/LoginRegisterForm";
import {AuthContext} from "../../context/AuthContext/AuthContext";
import {getColors} from "../../theme/theme";
import {View} from "native-base";

function AuthScreen({ navigation }) {
    const { user, errorMessage } = useContext(AuthContext);
    const { colorMode } = useColorMode();
    const colors = getColors(colorMode);
    const backgroundBox = colors.backgroundBox;
    const textColor = colors.text;
    return (
         <Center flex={1} px={4} bg={backgroundBox}>
             <View mb={10}>
                 <Text color={textColor} fontSize={28} >Welcome to</Text>
                 <Text color={textColor} fontSize={28} ><Text color="#57cc99" bold="bold">Garden</Text> App</Text>
             </View>
             <Box alignItems="center" width="100%">
                 {user ? (
                     <AuthorizedComponent
                         navigation={navigation}
                     />
                 ) : (
                     <>
                         {errorMessage ? <Text padding={4}>{errorMessage}</Text> : null}
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
