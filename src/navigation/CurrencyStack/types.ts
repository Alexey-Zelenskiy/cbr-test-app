import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Currency } from '../../common/types/Currency';

import { RootStackParamList, RootStackScreenProps } from '../types';

export type CurrencyStackParamList = {
  CurrencyList: undefined;
  CurrencyInfo: { currency: Currency };
};

export type CurrencyStackScreenProps<T extends keyof CurrencyStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CurrencyStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
