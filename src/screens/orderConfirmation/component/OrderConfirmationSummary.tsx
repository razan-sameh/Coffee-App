import React from 'react';
import {View, Text} from 'react-native';
import {Styles} from '../OrderConfirmationStyle';
import {typProduct} from '../../../Content/Types';

type Props = {
  order: any;
  products: typProduct[];
};

export const OrderConfirmationSummary = ({order, products}: Props) => {
  const getProductName = (id: string) => {
    const product = products.find(p => p.ID === id);
    return product?.title || 'Unknown Product';
  };

  return (
    <View style={Styles.summaryCard}>
      <View style={Styles.summaryRow}>
        <Text style={Styles.summaryLabel}>Order ID:</Text>
        <Text>{order.id}</Text>
      </View>
      <View style={[Styles.summaryRow, {alignItems: 'flex-start'}]}>
        <Text style={Styles.summaryLabel}>Items Ordered:</Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {order.items.map((item: any, index: number) => (
            <Text key={index}>
              {getProductName(item.productID)} x{item.count}
            </Text>
          ))}
        </View>
      </View>
      <View style={Styles.summaryRow}>
        <Text style={Styles.summaryLabel}>Total:</Text>
        <Text>${order.total.toFixed(2)}</Text>
      </View>
      <View style={Styles.summaryRow}>
        <Text style={Styles.summaryLabel}>Estimated Delivery Time:</Text>
        <Text>25-35 mins</Text>
      </View>
      <View style={Styles.summaryRow}>
        <Text style={Styles.summaryLabel}>Delivery Address:</Text>
        <Text style={{flex: 1, textAlign: 'right'}}>
          {order.deliveryInfo.address}
        </Text>
      </View>
      <View style={Styles.summaryRow}>
        <Text style={Styles.summaryLabel}>Payment Method:</Text>
        <Text>{order.paymentMethod}</Text>
      </View>
    </View>
  );
};
