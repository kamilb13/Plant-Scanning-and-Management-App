import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import React from "react";
import ProfileScreen from "./ProfileScreen";

const AuthenticatedScreen = ({ navigation, user, handleAuthentication }) => {

    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.emailText}>{user.email}</Text>
            <Button onPress={() => navigation.navigate('Main',{
                handleAuthentication: handleAuthentication,
            })} title={"Continue"} />
        </View>
    );
};

export default AuthenticatedScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
    },
    buttonContainer: {
        marginBottom: 16,
    },
    toggleText: {
        color: '#3498db',
        textAlign: 'center',
    },
    bottomContainer: {
        marginTop: 20,
    },
    emailText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});