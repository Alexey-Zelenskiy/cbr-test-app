import React, { memo } from 'react';

import { TouchableOpacity, Text } from 'react-native';

import { Currency } from '../../../../common/types/Currency';

import styles from './styles';

interface Props {
  item: Currency;
  onPress: () => void;
}

const DriverItem = memo(({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        {item.name} {item.value}
      </Text>
    </TouchableOpacity>
  );
});

export default DriverItem;
