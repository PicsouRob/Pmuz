/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/lib/integration/react";
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import TrackPlayer, { Capability } from 'react-native-track-player';

import StackNavigation from './src/Naviggation/StackNavigation';
import Store from './src/Redux/Store';

function App() {
  let persistor = persistStore(Store);
  
  useEffect(() => {
    const changeBarColor = async () => {
        try{
          const response = await changeNavigationBarColor('#6b0505', false);
          console.log(response)// {success: true}
        } catch(e){
            console.log(e)// {success: false}
        }
    }
    
    changeBarColor();
  }, []);

  useEffect(() => {
    // TrackPlayer.updateOptions({
    //   // Media controls capabilities
    //   capabilities: [
    //       Capability.Play,
    //       Capability.Pause,
    //       Capability.SkipToNext,
    //       Capability.SkipToPrevious,
    //       // Capability.Stop,
    //   ],
    // });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="rgba(89, 4, 4, 1)" barStyle="ligth-content" />
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <StackNavigation />
        </PersistGate>
      </Provider>
    </View>
  );
};

export default App;