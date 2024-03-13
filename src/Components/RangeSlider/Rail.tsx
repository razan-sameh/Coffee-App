import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { heightScale, moderateScale } from '../../styles/responsive';

const Rail = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: heightScale(11),
    borderRadius: moderateScale(12),
    backgroundColor: '#A09A90',
  },
});