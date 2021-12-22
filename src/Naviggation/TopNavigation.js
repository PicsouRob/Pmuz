import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListMusic from '../Screens/ListMusic';
import PlayList from '../Screens/PlayList';

const Top = createMaterialTopTabNavigator();

const TopNavigation = () => {
    return (
        <Top.Navigator
            initialRouteName="ListMusic"
            screenOptions={{
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                labelStyle: { fontWeight: "bold" },
                tabBarStyle: { backgroundColor: "rgba(89, 4, 4, 1)", },
                tabBarLabelStyle: { fontWeight: 'bold' },
                tabBarIndicatorStyle: { backgroundColor: '#fff' }
            }}
        >
            <Top.Screen name='ListMusic' component={ListMusic} 
                options={{ title: 'MY Music' }}
            />
            <Top.Screen name='PlayList' component={PlayList} 
                options={{ title: 'MY PLAYLIST' }}
            />
        </Top.Navigator>
    )
}

export default TopNavigation;