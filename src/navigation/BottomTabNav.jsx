import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import MyPlantsScreen from "../screens/MyPlantsScreen/MyPlantsScreen";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import { Text, useColorModeValue, useColorMode } from 'native-base';
import {getColors} from "../theme/theme";

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
            iconName = focused ? 'person-circle' : 'person-circle-outline';
            break;
        default:
            iconName = 'home';
    }

    return <Ionicons name={iconName} size={24} color={color} />;
};

const BottomTabNav = () => {



    const {colorMode} = useColorMode();

    const colors = getColors(colorMode);
    const tabBarActiveTintColor = colors.tabBarActiveTintColor;
    const tabBarInactiveTintColor = colors.tabBarInactiveTintColor;
    const tabBarBackgroundColor = colors.tabBarBackgroundColor;
    const tabBarLabelColor = colors.tabBarLabelColor;
    const headerColor = colors.backgroundBox;
    const headerColorText = colors.text;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: headerColor,
                },
                headerTintColor: headerColorText,

                tabBarIcon: ({ focused, color }) => getTabBarIcon(route, focused, color),
                tabBarLabel: ({ focused }) => (
                    <Text style={{ color: tabBarLabelColor, fontSize: focused ? 13 : 11 }} >
                        {route.name}
                    </Text>
                ),
                tabBarActiveTintColor: tabBarActiveTintColor,
                tabBarInactiveTintColor: tabBarInactiveTintColor,
                tabBarStyle: { backgroundColor: tabBarBackgroundColor },
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

export default BottomTabNav;
