import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {strPrimaryColor} from '../../styles/responsive';

const Thumb = () => {
  return <View style={styles.rootLow} />;
};

const styles = StyleSheet.create({
  rootLow: {
    width: 17,
    height: 17,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: strPrimaryColor,
  },
});

export default memo(Thumb);
