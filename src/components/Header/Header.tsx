import React, { memo } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { images } from '../../common/images';

import { styles } from './styles';

type Props = {
  title: string;
  titleAlign?: 'left' | 'right' | 'center';
  isLoading?: boolean;
  left?: boolean;
};
export const Header = memo(
  ({ title, titleAlign = 'center', isLoading, left }: Props) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    return (
      <View style={styles.main}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          {left ? (
            <View
              style={[styles.circle, isLoading && { backgroundColor: 'green' }]}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={images.arrowBack} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { textAlign: titleAlign }]}>{title}</Text>
        </View>
      </View>
    );
  }
);

export default Header;
