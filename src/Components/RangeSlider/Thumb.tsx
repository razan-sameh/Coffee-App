import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import { heightScale, moderateScale, strPrimaryColor, widthScale } from '../../styles/responsive';

const THUMB_RADIUS_LOW = 12;
const THUMB_RADIUS_HIGH = 16;

const Thumb = () => {
  return <View style={styles.rootLow} />;
};

const styles = StyleSheet.create({
  rootLow: {
    width: 23,
    height: 23,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: strPrimaryColor,
  },
});

export default memo(Thumb);