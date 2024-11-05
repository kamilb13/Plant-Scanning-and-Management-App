const colors = {
    light: {
        background: '#ffffff',
        backgroundBox: '#f3f3f3',
        text: '#000000',
        icon: '#000000',
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: 'gray',
        tabBarBackgroundColor: '#ffffff',
        tabBarLabelColor: '#000',
    },
    dark: {
        background: '#000000',
        backgroundBox: '#5c5c5c',
        text: '#ffffff',
        icon: '#ffffff',
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#fff',
        tabBarBackgroundColor: '#5c5c5c',
        tabBarLabelColor: '#fff',
    },
};

export const getColors = (mode) => {
    return mode === 'dark' ? colors.dark : colors.light;
};