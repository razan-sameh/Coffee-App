import React from 'react';
import {View, Text} from 'react-native';
import {CardField} from '@stripe/stripe-react-native';
import {Styles} from '../PaymentStyle';
type Props = {
  setCardDetails: (details: any) => void; // ideally replace `any` with correct type
};
export const CardDetails = ({setCardDetails}: Props) => (
  <View style={Styles.cardFieldContainer}>
    <Text style={Styles.inputLabel}>Card Details</Text>
    <CardField
      postalCodeEnabled={false}
      placeholders={{number: '4242 4242 4242 4242'}}
      cardStyle={{
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        fontSize: 16,
        placeholderColor: '#999999',
      }}
      style={Styles.cardFieldInput}
      onCardChange={setCardDetails}
    />
  </View>
);
