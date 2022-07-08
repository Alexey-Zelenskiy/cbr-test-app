import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { CurrencyStackParamList } from './CurrencyStack/types';

export type RootStackParamList = {
  CurrencyStack: NavigatorScreenParams<CurrencyStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
