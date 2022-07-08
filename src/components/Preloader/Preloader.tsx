import React from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';

const Preloader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.preloader}>
        <ActivityIndicator />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};
export default Preloader;
