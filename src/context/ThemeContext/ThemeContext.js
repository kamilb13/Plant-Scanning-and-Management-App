import React, { createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorMode } from 'native-base';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    const saveThemePreference = async (mode) => {
        try {
            await AsyncStorage.setItem('themePreference', mode);
        } catch (error) {
            console.log('Error saving theme preference:', error);
        }
    };

    const handleToggleColorMode = () => {
        const newMode = colorMode === 'light' ? 'dark' : 'light';
        saveThemePreference(newMode);
        toggleColorMode();
    };

    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme =
                    await AsyncStorage.getItem('themePreference');
                if (savedTheme && savedTheme !== colorMode) {
                    toggleColorMode();
                }
            } catch (error) {
                console.log('Error loading theme preference:', error);
            }
        };
        loadThemePreference();
    }, [colorMode, toggleColorMode]);

    return (
        <ThemeContext.Provider value={{ colorMode, handleToggleColorMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
