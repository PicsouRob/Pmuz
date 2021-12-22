import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TopNavigation from './TopNavigation';
import Player from '../Screens/Player';
import TrackPlaylist from '../Screens/TrackPlaylist';

const Stack = createStackNavigator();

function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Top'
                backBehavior='history'
            >
                <Stack.Screen name="Top" component={TopNavigation} 
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="Player" component={Player} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="TrackPlaylist" component={TrackPlaylist} 
                    options={{
                        headerStyle: { backgroundColor: 'rgba(89, 4, 4, 1)' },
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigation;