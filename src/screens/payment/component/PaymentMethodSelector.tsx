import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Styles} from '../PaymentStyle';
import {enmPaymentMethod} from '../../../Content/Enums';
type Props = {
  paymentType: enmPaymentMethod; // or a more specific type if you have it
  setPaymentType: (arg0: enmPaymentMethod) => void;
};
export const PaymentMethodSelector = ({paymentType, setPaymentType}: Props) => (
  <View style={Styles.paymentTypeContainer}>
    <Text style={Styles.inputLabel}>Payment Method</Text>
    <View style={Styles.radioGroup}>
      {[enmPaymentMethod.cash, enmPaymentMethod.CreditCard].map(type => (
        <TouchableOpacity
          key={type}
          style={Styles.radioOption}
          onPress={() => setPaymentType(type)}>
          <View style={Styles.radioCircle}>
            {paymentType === type && <View style={Styles.radioDot} />}
          </View>
          <Text style={Styles.radioLabel}>
            {type === enmPaymentMethod.cash
              ? enmPaymentMethod.cash
              : enmPaymentMethod.CreditCard}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);
