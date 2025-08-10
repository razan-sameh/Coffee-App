import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {strSecondColor} from '../../../styles/responsive';
import {Styles} from '../CheckOutStyle';

type Props = {
  onPress: () => void;
  disabled: boolean;
  loading?: boolean;
};

export const PlaceOrderButton = ({onPress, disabled, loading}: Props) => (
  <TouchableOpacity
    style={[Styles.btnSubmitContainer, disabled && Styles.btnSubmitDisabled]}
    onPress={onPress}
    disabled={disabled}>
    {loading ? (
      <ActivityIndicator size={20} color={strSecondColor} />
    ) : (
      <Text style={Styles.btnSubmitText}>Place Order</Text>
    )}
  </TouchableOpacity>
);
