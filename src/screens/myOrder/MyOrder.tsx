import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Styles} from './MyOrderStyles';
import {ArrowBack} from '../../Components/ArrowBack';
import {typOrder} from '../../Content/Types';
import {enmOrderStatus} from '../../Content/Enums';
import {getUserID} from '../../services/Authentication';
import {useGetOrdersByUserIdQuery} from '../../services/firebaseApi';
import {strPrimaryColor, strTextColor} from '../../styles/responsive';
import moment from 'moment';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

export default function MyOrder() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'completed'>(
    'active',
  );
  const uid = getUserID(); // 👈 get current user id
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useGetOrdersByUserIdQuery(uid!, {skip: !uid});
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const renderOrder = ({item}: {item: typOrder}) => {
    const itemsCount = Array.isArray(item.items) ? item.items.length : 0;
    const isDelivered = item?.status === enmOrderStatus.Delivered;

    return (
      <View style={Styles.card}>
        <Text style={Styles.date}>{item.date || ''}</Text>
        <Text style={Styles.orderNumber}>Order Number: {item.id}</Text>
        <Text style={Styles.items}>{itemsCount} items</Text>
        <Text style={Styles.total}>Total {item.total ?? 0}$</Text>
        <View style={Styles.row}>
          <TouchableOpacity
            style={Styles.viewButton}
            onPress={() => {
              navigation.navigate('OrderNavigator', {
                screen: 'OrderDetails',
                params: {orderId: item.id}, // ✅ pass orderId
              });
            }}>
            <Text style={Styles.viewText}>View Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Styles.traceButton}
            onPress={() => {
              if (isDelivered) {
                navigation.navigate('RateOrder', {orderId: item.id});
              } else {
                navigation.navigate('TrackOrder', {orderId: item.id});
              }
            }}>
            <Text style={Styles.traceText}>
              {isDelivered ? 'Rate Order' : 'Track Order'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const sortOrdersByDateTimeDesc = (orders: typOrder[]) =>
    [...orders].sort((a, b) => {
      const dateA = moment(a.date, 'YYYY-MM-DD HH:mm');
      const dateB = moment(b.date, 'YYYY-MM-DD HH:mm');
      return dateA.isAfter(dateB) ? -1 : 1;
    });

  // ✅ split dynamically based on current status
  const activeOrders = sortOrdersByDateTimeDesc(
    orders.filter(o => o.status !== enmOrderStatus.Delivered),
  );
  const completedOrders = sortOrdersByDateTimeDesc(
    orders.filter(o => o.status === enmOrderStatus.Delivered),
  );

  const data = selectedTab === 'active' ? activeOrders : completedOrders;

  return (
    <View style={Styles.wall}>
      <ArrowBack />
      <Text style={Styles.txtTitle}>My Order</Text>
      <View style={Styles.container}>
        {/* Tabs */}
        <View style={Styles.tabs}>
          <TouchableOpacity
            style={[Styles.tab, selectedTab === 'active' && Styles.activeTab]}
            onPress={() => setSelectedTab('active')}>
            <Text
              style={[
                Styles.tabText,
                selectedTab === 'active' && Styles.activeTabText,
              ]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Styles.tab,
              selectedTab === 'completed' && Styles.activeTab,
            ]}
            onPress={() => setSelectedTab('completed')}>
            <Text
              style={[
                Styles.tabText,
                selectedTab === 'completed' && Styles.activeTabText,
              ]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Loader & Error */}
        {isLoading && (
          <ActivityIndicator size="large" color={strPrimaryColor} />
        )}
        {isError && <Text style={{color: 'red'}}>{JSON.stringify(error)}</Text>}

        {/* Orders List */}
        {!isLoading && (
          <FlatList
            data={data}
            renderItem={renderOrder}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 70}}
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  color: strTextColor,
                }}>
                No {selectedTab} orders found.
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
}
