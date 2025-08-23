import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Styles} from '../OrderConfirmationStyle';
import {images} from '../../../Content/resources';

type Props = {
  onBackPress: () => void;
};
export const OrderConfirmationButtons = ({onBackPress}: Props) => {
  return (
    <TouchableOpacity style={Styles.btnOutline} onPress={onBackPress}>
      <FastImage
        source={images.HomeIcon}
        style={{width: 20, height: 20, marginRight: 8}}
        resizeMode="contain"
      />
      <Text style={Styles.btnOutlineText}>Back to Home</Text>
    </TouchableOpacity>
  );
};
