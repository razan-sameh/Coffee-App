import React from 'react';
import {View, Text} from 'react-native';
import {typDeliveryInfo} from '../../../Content/Types';
import {Styles} from '../PaymentStyle';

type Props = {
  deliveryInfo: typDeliveryInfo;
};

export const DeliveryInfoSummary = ({deliveryInfo}: Props) => {
  return (
    <View style={Styles.summaryContainer}>
      <Text style={Styles.summaryTitle}>Delivery Information</Text>

      <View style={Styles.summaryItem}>
        <Text style={Styles.itemName}>Name</Text>
        <Text style={Styles.itemPrice}>{deliveryInfo.name || '-'}</Text>
      </View>

      <View style={Styles.summaryItem}>
        <Text style={Styles.itemName}>Address</Text>
        <Text style={Styles.itemPrice}>{deliveryInfo.address || '-'}</Text>
      </View>

      <View style={Styles.summaryItem}>
        <Text style={Styles.itemName}>Phone</Text>
        <Text style={Styles.itemPrice}>{deliveryInfo.phone || '-'}</Text>
      </View>
    </View>
  );
};
