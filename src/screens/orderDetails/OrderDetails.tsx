import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ArrowBack} from '../../Components/ArrowBack';
import {Styles} from './OrderDetailsStyle';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  useGetOrderByIdQuery,
  useGetProductsQuery,
} from '../../services/firebaseApi';
import {strPrimaryColor} from '../../styles/responsive';
import FastImage from 'react-native-fast-image';
import {enmOrderStatus} from '../../Content/Enums';

const OrderDetails = () => {
  const route = useRoute<any>();
  const {orderId} = route.params; // ✅ get param
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useGetOrderByIdQuery(orderId);
  const {data: products} = useGetProductsQuery();
  const isDelivered = order?.status === enmOrderStatus.Delivered;
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const handleFooterPress = () => {
    if (isDelivered) {
      navigation.navigate('RateOrder', {orderId: order.id});
    } else {
      navigation.navigate('TrackOrder', {orderId: order?.id});
    }
  };

  if (isLoading) {
    return (
      <View
        style={[Styles.wall, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" color={strPrimaryColor} />
      </View>
    );
  }

  if (isError || !order) {
    return (
      <View style={Styles.wall}>
        <ArrowBack />
        <Text style={{color: 'red'}}>
          Failed to load order: {JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  return (
    <View style={Styles.wall}>
      <ArrowBack />
      <Text style={Styles.txtTitle}>Order Details</Text>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 70}}>
        {/* ✅ Order Status */}
        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>Order Status</Text>
          <TouchableOpacity style={Styles.statusBtn}>
            <Text style={Styles.statusTxt}>{order.status}</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.seperator} />

        {/* ✅ Transaction Info */}
        <View style={Styles.section}>
          <Text style={Styles.label}>Transaction Date</Text>
          <Text style={Styles.value}>{order.date}</Text>

          <Text style={Styles.label}>Payment Method</Text>
          <Text style={Styles.value}>{order.paymentMethod}</Text>
        </View>

        <View style={Styles.seperator} />

        {/* ✅ Order Items */}
        {/* ✅ Order Items */}
        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>Your Order</Text>

          {order.items.map((it, idx) => {
            // find matching product
            const product = products?.find(p => p.ID === it.productID);

            return (
              <View style={Styles.itemRow} key={idx}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  {/* show product title instead of raw ID */}
                  <FastImage
                    style={Styles.itemImage}
                    source={{uri: product?.image[0] || ''}}
                  />
                  <View style={{paddingLeft: 10}}>
                    <Text style={Styles.itemName}>
                      {product ? product.title : `Product ${it.productID}`}
                    </Text>

                    {/* optional: show category name */}
                    {product?.category && (
                      <Text style={Styles.itemSub}>
                        {product.category.title}
                      </Text>
                    )}

                    {/* quantity and price */}
                    <Text style={Styles.itemQty}>
                      {it.count} x ${it.price}
                    </Text>
                  </View>
                </View>

                {/* right side total */}
                <Text style={Styles.itemPrice}>${it.count * it.price}</Text>
              </View>
            );
          })}

          {/* Subtotal & Grand Total */}
          <View style={Styles.summaryRow}>
            <Text style={Styles.label}>Subtotal</Text>
            <Text style={Styles.value}>${order.SubTotal}</Text>
          </View>
          <View style={Styles.summaryRow}>
            <Text style={Styles.label}>Delivery</Text>
            <Text style={Styles.value}>${order.delivery}</Text>
          </View>
          <View style={Styles.summaryRow}>
            <Text style={Styles.totalTxt}>Total</Text>
            <Text style={Styles.totalTxt}>${order.total}</Text>
          </View>
        </View>

        <View style={Styles.seperator} />

        {/* ✅ Customer Details */}
        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>Customer Detail</Text>
          <Text style={Styles.label}>Name</Text>
          <Text style={Styles.value}>{order.deliveryInfo?.name}</Text>

          <Text style={Styles.label}>Phone Number</Text>
          <Text style={Styles.value}>{order.deliveryInfo?.phone?.number}</Text>

          <Text style={Styles.label}>Address</Text>
          <Text style={Styles.value}>
            {order.deliveryInfo?.address?.address?.house_number}
            {'\n'} {order.deliveryInfo?.address?.address?.road}
            {'\n'} {order.deliveryInfo?.address?.address?.city}
            {'\n'} {order.deliveryInfo?.address?.address?.country}
            {'\n'} {order.deliveryInfo?.address?.latitude}
            {', '}
            {order.deliveryInfo?.address?.longitude}
          </Text>
        </View>

        {/* Footer */}
        <View style={Styles.footer}>
          <TouchableOpacity
            style={Styles.footerBtn}
            onPress={handleFooterPress}>
            <Text style={Styles.footerBtnTxt}>
              {isDelivered ? 'Rate Order' : 'Tracke Order'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;
