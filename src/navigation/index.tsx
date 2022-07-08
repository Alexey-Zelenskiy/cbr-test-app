import React, { useCallback, useEffect, useState } from 'react';

import { ActivityIndicator, StyleSheet } from 'react-native';

import Animated, { FadeIn } from 'react-native-reanimated';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../store';
import { AsyncStorageKeys } from '../common/asyncStorageKeys';
import { useNetInfo } from '../hooks/useNetInfo';

import { RootStackParamList } from './types';
import CurrencyStackNavigator from './CurrencyStack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = observer(() => {
  const screenOption = {
    headerShown: false
  };

  const store = useStore();
  const { currencyStore } = store;
  const { fetchCurrencyList } = currencyStore;
  const [initialState, setInitialState] = useState<NavigationState | undefined>(
    undefined
  );
  const [isReady, setIsReady] = useState<boolean>(false);
  const onStateChange = useCallback((state: NavigationState | undefined) => {
    AsyncStorage.setItem(
      AsyncStorageKeys.StatePersistence,
      JSON.stringify(state)
    );
  }, []);
  const [isConnected] = useNetInfo();

  useEffect(() => {
    if (!isReady) {
      (async () => {
        try {
          const savedStateString = await AsyncStorage.getItem(
            AsyncStorageKeys.StatePersistence
          );
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;
          if (state !== undefined) {
            setInitialState(state);
          }
        } finally {
          setIsReady(true);
        }
      })();
    }
  }, [isReady]);

  useEffect(() => {
    fetchCurrencyList(isConnected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return isReady ? (
    <NavigationContainer
      initialState={initialState}
      onStateChange={onStateChange}
    >
      <RootStack.Navigator screenOptions={screenOption}>
        <RootStack.Screen
          name="CurrencyStack"
          component={CurrencyStackNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  ) : (
    <Animated.View
      style={{ ...StyleSheet.absoluteFillObject }}
      entering={isReady ? FadeIn : undefined}
      onLayout={() => RNBootSplash.hide()}
    >
      <ActivityIndicator size={'large'} />
    </Animated.View>
  );
});

export default RootStackNavigator;
