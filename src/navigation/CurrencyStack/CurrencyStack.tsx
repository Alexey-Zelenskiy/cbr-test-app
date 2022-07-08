import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CurrencyInfo from '../../screens/CurrencyInfo';
import CurrencyList from '../../screens/CurrencyList';

import { CurrencyStackParamList } from './types';

const CurrencyStack = createNativeStackNavigator<CurrencyStackParamList>();

const screenOptions = {
  headerShown: false
};

const CurrencyStackNavigator = () => {
  return (
    <CurrencyStack.Navigator screenOptions={screenOptions}>
      <CurrencyStack.Screen name="CurrencyList" component={CurrencyList} />
      <CurrencyStack.Screen name="CurrencyInfo" component={CurrencyInfo} />
    </CurrencyStack.Navigator>
  );
};

export default CurrencyStackNavigator;
