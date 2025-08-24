import React from 'react';
import {View, Text} from 'react-native';
import {typCart} from '../../../Content/Types';
import {Styles} from '../CheckOutStyle';
type Props = {
  productMap: Record<string, any>; // or a more specific type if you have it
  cartItems: typCart[];
  total: number;
};
export const OrderSummary = ({cartItems, productMap, total}: Props) => {
  const deliveryPrice = 5;

  return (
    <View style={Styles.summaryContainer}>
      <Text style={Styles.summaryTitle}>Order Summary</Text>
      {cartItems.map((item: typCart, index: number) => {
        const product = productMap.get(item.productID);
        const productTitle = product?.title || 'Unknown';

        return (
          <View key={index} style={Styles.summaryItem}>
            <Text style={Styles.itemName}>
              {productTitle} ({item.size}) × {item.count}
            </Text>
            <Text style={Styles.itemPrice}>
              ${(item.price * item.count).toFixed(2)}
            </Text>
          </View>
        );
      })}
      <View style={Styles.divider} />
      <View style={Styles.summaryRow}>
        <Text style={Styles.totalLabel}>Subtotal</Text>
        <Text style={Styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
      <View style={Styles.summaryRow}>
        <Text style={Styles.totalLabel}>Delivery</Text>
        <Text style={Styles.totalValue}>${deliveryPrice}</Text>
      </View>
      <View style={Styles.summaryRow}>
        <Text style={Styles.totalLabel}>Total</Text>
        <Text style={Styles.totalValue}>
          ${(total + deliveryPrice).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};
