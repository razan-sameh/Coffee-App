import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Styles} from '../OrderConfirmationStyle';
import {images} from '../../../Content/resources';
import {strTextColor} from '../../../styles/responsive';

type Props = {
  onBackPress: () => void;
  onTrackPress: () => void;
};
export const OrderConfirmationButtons = ({
  onBackPress,
  onTrackPress,
}: Props) => {
  return (
    <>
      <TouchableOpacity style={Styles.btnOutline} onPress={onBackPress}>
        <FastImage
          source={images.HomeIcon}
          style={{width: 20, height: 20, marginRight: 8}}
          resizeMode="contain"
          tintColor={strTextColor}
        />
        <Text style={Styles.btnOutlineText}>Back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.btnFilled} onPress={onTrackPress}>
        <FastImage
          source={images.onWay}
          style={{width: 24, height: 24, marginRight: 8}}
          resizeMode="contain"
        />
        <Text style={Styles.btnFilledText}>Track Order</Text>
      </TouchableOpacity>
    </>
  );
};
