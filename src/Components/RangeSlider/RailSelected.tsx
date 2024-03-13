import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import { heightScale, moderateScale, strPrimaryColor } from '../../styles/responsive';

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: heightScale(11),
    backgroundColor: strPrimaryColor,
    borderRadius: moderateScale(12),
  },
});