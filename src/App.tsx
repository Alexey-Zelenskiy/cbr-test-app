import React from 'react';

import { StatusBar } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootStackNavigator from './navigation';
import { RootStateProvider } from './store';

const App = () => {
  return (
    <RootStateProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar barStyle={'light-content'} />
          <RootStackNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </RootStateProvider>
  );
};

export default App;
