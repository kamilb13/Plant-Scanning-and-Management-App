import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import MainTabs from './components/MainTabs';
import AuthScreen from "./components/AuthScreen";

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBv6GyzKHwLnZfLgCeR1FvN_w147TfyuxA",
  authDomain: "garden-app-f715b.firebaseapp.com",
  projectId: "garden-app-f715b",
  storageBucket: "garden-app-f715b.appspot.com",
  messagingSenderId: "401179222160",
  appId: "1:401179222160:web:c2bb3b5fd762dc0e8bb815",
  measurementId: "G-5HH9QQ7JT5"
};


export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />

          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Auth" component={AuthScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}



// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
// import { initializeApp } from '@firebase/app';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
// import AuthenticatedScreen from "./components/AuthenticatedScreen";
// import AuthScreen from "./components/AuthScreen";


// const firebaseConfig = {
//   apiKey: "AIzaSyBv6GyzKHwLnZfLgCeR1FvN_w147TfyuxA",
//   authDomain: "garden-app-f715b.firebaseapp.com",
//   projectId: "garden-app-f715b",
//   storageBucket: "garden-app-f715b.appspot.com",
//   messagingSenderId: "401179222160",
//   appId: "1:401179222160:web:c2bb3b5fd762dc0e8bb815",
//   measurementId: "G-5HH9QQ7JT5"
// };
//
// const app = initializeApp(firebaseConfig);

//export default function App() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null); // Track user authentication state
  // const [isLogin, setIsLogin] = useState(true);
  //
  // const auth = getAuth(app);
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });
  //
  //   return () => unsubscribe();
  // }, [auth]);
  //
  //
  // const handleAuthentication = async () => {
  //   try {
  //     if (user) {
  //       // If user is already authenticated, log out
  //       console.log('User logged out successfully!');
  //       await signOut(auth);
  //     } else {
  //       // Sign in or sign up
  //       if (isLogin) {
  //         // Sign in
  //         await signInWithEmailAndPassword(auth, email, password);
  //         console.log('User signed in successfully!');
  //       } else {
  //         // Sign up
  //         await createUserWithEmailAndPassword(auth, email, password);
  //         console.log('User created successfully!');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Authentication error:', error.message);
  //   }
  // };
  //
  // return (
  //     <ScrollView contentContainerStyle={styles.container}>
  //       {user ? (
  //           // Show user's email if user is authenticated
  //           <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
  //       ) : (
  //           // Show sign-in or sign-up form if user is not authenticated
  //           <AuthScreen
  //               email={email}
  //               setEmail={setEmail}
  //               password={password}
  //               setPassword={setPassword}
  //               isLogin={isLogin}
  //               setIsLogin={setIsLogin}
  //               handleAuthentication={handleAuthentication}
  //           />
  //       )}
  //     </ScrollView>

//  );
//}
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   authContainer: {
//     width: '80%',
//     maxWidth: 400,
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 16,
//     padding: 8,
//     borderRadius: 4,
//   },
//   buttonContainer: {
//     marginBottom: 16,
//   },
//   toggleText: {
//     color: '#3498db',
//     textAlign: 'center',
//   },
//   bottomContainer: {
//     marginTop: 20,
//   },
//   emailText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
// });
