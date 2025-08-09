import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Styles} from '../PaymentStyle';
type Props = {
  onPress: () => void;
  disabled: boolean;
};
export const PayButton = ({onPress, disabled}: Props) => (
  <TouchableOpacity
    style={[Styles.btnSubmitContainer, disabled && Styles.btnSubmitDisabled]}
    onPress={onPress}
    disabled={disabled}>
    <Text style={Styles.btnSubmitText}>Place Order</Text>
  </TouchableOpacity>
);
