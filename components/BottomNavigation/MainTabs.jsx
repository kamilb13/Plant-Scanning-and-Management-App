import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import MyPlantsScreen from "../../screens/MyPlantsScreen/MyPlantsScreen";
import AccountScreen from "../../screens/AccountScreen/AccountScreen";
import { Box, Text, Center } from 'native-base';

const Tab = createBottomTabNavigator();

const tabScreenOptions = {
    headerShown: true,
    tabBarShowLabel: true
}

const getTabBarIcon = (route, focused, color) => {
    let iconName;

    switch (route.name) {
        case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'My Plants':
            iconName = focused ? 'leaf' : 'leaf-outline';
            break;
        case 'Account':
            iconName = focused ? 'accessibility' : 'accessibility-outline';
            break;
        default:
            iconName = 'home';
    }

    return <Ionicons name={iconName} size={24} color={color} />;
};

const MainTabs = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => getTabBarIcon(route, focused, color),
                tabBarLabel: ({ focused }) => focused ? <Text style={{fontSize: 13}}>{route.name}</Text> : <Text style={{fontSize: 11}}>{route.name}</Text>,

                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#fff' },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={tabScreenOptions}/>
            <Tab.Screen name="My Plants" component={MyPlantsScreen} options={tabScreenOptions}/>
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={tabScreenOptions}
            />
        </Tab.Navigator>
    );
}

export default MainTabs;
