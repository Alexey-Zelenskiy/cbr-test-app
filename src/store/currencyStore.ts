import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import moment from 'moment';

import { AppApi } from '../api';
import { AsyncStorageKeys } from '../common/asyncStorageKeys';
import { Currency } from '../common/types/Currency';
import { parseXmlToJson } from '../common/utils/xmlToJson';

export class CurrencyStore {
  isLoading: boolean = false;
  currencyList: Currency[] = null as Currency[];
  requestTime: string = null;
  constructor() {
    makeAutoObservable(this);
  }

  fetchCurrencyList = async (isConnection: boolean = true) => {
    try {
      this.setIsLoading(true);
      const currencyList = await AppApi.getCursOnDate();
      this.setCurrencyList(parseXmlToJson(currencyList));
    } catch (error) {
      if (!isConnection) {
        const currencyList = await AsyncStorage.getItem(
          AsyncStorageKeys.CurrencyList
        );
        if (currencyList) {
          this.setCurrencyList(JSON.parse(currencyList));
        }
      }
    } finally {
      this.setIsLoading(false);
      this.setRequestTime();
    }
  };

  setCurrencyList = (currencyList: Currency[], isConnected: boolean = true) => {
    this.currencyList = currencyList;
    if (isConnected) {
      AsyncStorage.setItem(
        AsyncStorageKeys.CurrencyList,
        JSON.stringify(currencyList)
      );
    }
  };

  setRequestTime = () => {
    this.requestTime = moment(new Date()).format('HH:mm:ss');
  };

  setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };
}
