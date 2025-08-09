import React from 'react';
import {View} from 'react-native';
import {ArrowBack} from '../../../Components/ArrowBack';
import {Styles} from '../OrderConfirmationStyle';

export const OrderConfirmationHeader = () => (
  <View style={Styles.backArrowContainer}>
    <ArrowBack />
  </View>
);
