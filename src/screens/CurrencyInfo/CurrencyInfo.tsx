import React, { useEffect, useMemo, useState } from 'react';

import { View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKeys } from '../../common/asyncStorageKeys';
import { Currency } from '../../common/types/Currency';
import Header from '../../components/Header';
import Label from '../../components/Label';
import { CurrencyStackScreenProps } from '../../navigation/CurrencyStack/types';

import styles from './styles';

const DriverInfo = ({ route }: CurrencyStackScreenProps<'CurrencyInfo'>) => {
  const params = useMemo(() => {
    return (
      route.params ||
      ({} as Readonly<{
        currency: Currency;
      }>)
    );
  }, [route.params]);

  const { currency } = params ?? { currency: null };
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(currency);
  const { charcode, name, nominal, numcode, value } = currentCurrency;

  useEffect(() => {
    let isMounted = false;
    const init = async () => {
      const curr = await AsyncStorage.getItem(AsyncStorageKeys.CurrentCurrency);
      if (!isMounted) {
        setCurrentCurrency(JSON.parse(curr));
      }
    };
    if (!currency) {
      init();
    }
    return () => {
      isMounted = false;
    };
  }, [currency]);

  return (
    <>
      <Header title={name} left={false} />
      <View style={styles.container}>
        {name && <Label text="Name" subText={name} />}
        {charcode && <Label text="Charcode" subText={charcode} />}
        {nominal && <Label text="Nominal" subText={nominal} />}
        {numcode && <Label text="Numcode" subText={numcode} />}
        {value && <Label text="Value" subText={value} />}
      </View>
    </>
  );
};

export default DriverInfo;
