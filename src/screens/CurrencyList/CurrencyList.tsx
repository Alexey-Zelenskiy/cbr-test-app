import React, { useCallback, useEffect, useRef } from 'react';

import { FlatList, ListRenderItem, View } from 'react-native';

import { observer } from 'mobx-react-lite';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Currency } from '../../common/types/Currency';
import Header from '../../components/Header';
import Preloader from '../../components/Preloader';
import { CurrencyStackScreenProps } from '../../navigation/CurrencyStack/types';
import { useStore } from '../../store';
import { useNetInfo } from '../../hooks/useNetInfo';
import { AsyncStorageKeys } from '../../common/asyncStorageKeys';

import CurrencyItem from './components/CurrencyItem';
import styles from './styles';

const Main = observer(
  ({ navigation }: CurrencyStackScreenProps<'CurrencyList'>) => {
    const store = useStore();
    const { currencyStore } = store;
    const {
      fetchCurrencyList,
      currencyList,
      isLoading,
      setCurrencyList,
      requestTime
    } = currencyStore;

    const refList = useRef<FlatList>(null);
    const [isConnected] = useNetInfo();
    const renderItem: ListRenderItem<Currency> = useCallback(({ item }) => {
      return (
        <CurrencyItem item={item} onPress={() => goToCurrencyInfo(item)} />
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goToCurrencyInfo = useCallback(
      async (currency: Currency) => {
        await AsyncStorage.setItem(
          AsyncStorageKeys.CurrentCurrency,
          JSON.stringify(currency)
        );
        navigation.navigate('CurrencyInfo', { currency });
      },
      [navigation]
    );

    const keyExtractor = useCallback(
      (item: Currency) => item.attributes.id,
      []
    );

    const onRefresh = useCallback(() => {
      setCurrencyList(null);
      fetchCurrencyList(isConnected);
    }, [fetchCurrencyList, setCurrencyList, isConnected]);

    useEffect(() => {
      let isMounted = true;
      const intervalId = setInterval(() => {
        if (!isMounted) return;
        fetchCurrencyList(isConnected);
      }, 15000);

      return () => {
        clearInterval(intervalId);
        isMounted = false;
      };
    }, [fetchCurrencyList, isConnected]);

    return (
      <>
        <Header title={requestTime} isLoading={isLoading} left={true} />
        <View style={styles.container}>
          {!!currencyList && (
            <FlatList
              style={{ flex: 1 }}
              ref={refList}
              keyExtractor={keyExtractor}
              data={currencyList}
              extraData={currencyList}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              refreshing={false}
              onRefresh={onRefresh}
            />
          )}
          {isLoading && <Preloader />}
        </View>
      </>
    );
  }
);

export default Main;
