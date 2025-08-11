import database from '@react-native-firebase/database';
import {typOrder} from '../Content/Types';
import {v4 as uuidv4} from 'uuid';
import {enmOrderStatus, enmOrderType, enmPlatform} from '../Content/Enums';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import {simulateOrder} from '../Content/Utils';
import {ToastAndroid} from 'react-native';

export const addOrderToFirebase = async (
  order: Omit<
    typOrder,
    'id' | 'platform' | 'orderType' | 'date' | 'estimatedTime' | 'status'
  >,
): Promise<typOrder> => {
  const orderId = uuidv4();
  const orderWithId: typOrder = {
    ...order,
    id: orderId,
    platform: enmPlatform.mobile,
    orderType: enmOrderType.delivery,
    date: moment().format('YYYY-MM-DD HH:mm'),
    estimatedTime: '25-30 min',
    status: enmOrderStatus.Placed,
  };

  try {
    await database().ref(`order/${orderId}`).set(orderWithId);
    const uid = auth().currentUser?.uid;
    await simulateOrder(uid!, orderId);
    return orderWithId;
  } catch (error) {
    ToastAndroid.show(`Error adding order:${error}`, ToastAndroid.SHORT);
    console.error('Error adding order:', error);
    throw error;
  }
};

export const getOrdersByUserIdFromFirebase = async (
  uid: string,
): Promise<typOrder[]> => {
  try {
    const snapshot = await database().ref('order').once('value');
    const ordersObject = snapshot.val() || {};

    const orders: typOrder[] = (
      Object.values(ordersObject) as typOrder[]
    ).filter(order => order.userId === uid);

    return orders;
  } catch (error) {
    ToastAndroid.show(`Error fetching orders: ${error}`, ToastAndroid.SHORT);
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderByIdFromFirebase = async (
  orderId: string,
): Promise<typOrder | null> => {
  try {
    const snapshot = await database().ref(`order/${orderId}`).once('value');
    const order = snapshot.val();

    if (!order) {
      console.warn(`Order with ID ${orderId} not found`);
      return null;
    }

    return order as typOrder;
  } catch (error) {
    ToastAndroid.show(
      `Error fetching order ${orderId}: ${error}`,
      ToastAndroid.SHORT,
    );
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};
