import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "./Home/HomeScreen";
import ProfileScreen from "./ProfileScreen";
import AccountScreen from "./AccountScreen";

const Tab = createBottomTabNavigator();

function MainTabs({route}) {
    const { handleAuthentication } = route.params;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({focused, size, color}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'accessibility' : 'accessibility-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#fff' },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            {/*<Tab.Screen name="Account" component={AccountScreen}/>*/}
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                initialParams={{ handleAuthentication }}
            />
        </Tab.Navigator>
    );
}

export default MainTabs;
