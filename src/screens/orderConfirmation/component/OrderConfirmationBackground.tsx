import React from 'react';
import FastImage from 'react-native-fast-image';
import {Styles} from '../OrderConfirmationStyle';
import {images} from '../../../Content/resources';

export const OrderConfirmationBackground = () => (
  <>
    <FastImage
      style={Styles.wave}
      resizeMode="contain"
      source={images.WallWave}
    />
    <FastImage
      style={Styles.wallCoffeeImage1}
      resizeMode="contain"
      source={images.LoginWallIcon1}
    />
    <FastImage
      style={Styles.wallCoffeeImage2}
      resizeMode="contain"
      source={images.LoginWallIcon2}
    />
  </>
);
