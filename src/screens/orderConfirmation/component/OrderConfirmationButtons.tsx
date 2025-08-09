import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Styles} from '../OrderConfirmationStyle';
import {images} from '../../../Content/resources';

type Props = {
  navigationTo: NavigationProp<ParamListBase>;
};

export const OrderConfirmationButtons = ({navigationTo}: Props) => (
  <TouchableOpacity
    style={Styles.btnOutline}
    onPress={() => navigationTo.navigate('TapNavigator', {screen: 'Home'})}>
    <FastImage
      source={images.HomeIcon}
      style={{width: 20, height: 20, marginRight: 8}}
      resizeMode="contain"
    />
    <Text style={Styles.btnOutlineText}>Back to Home</Text>
  </TouchableOpacity>
);
