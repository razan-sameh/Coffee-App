import React, {useEffect, useMemo} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Styles} from '../../styles/Cart';
import {images} from '../../Content/resources';
import FastImage from 'react-native-fast-image';
import {ArrowBack} from '../../Components/ArrowBack';
import {useSelector} from 'react-redux';
import {fetchCart} from '../../redux/slices/cartSlice';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {RootState, useAppDispatch} from '../../redux/store';
import {getUserID} from '../../Content/Authentication';
import {CartItem} from './component/CartItem';

export function Cart() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();
  const strUserID = getUserID();

  const {items: atpvCartItems} = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (strUserID) {
      dispatch(fetchCart(strUserID));
    }
  }, [dispatch, strUserID]);

  const totalPrice = useMemo(() => {
    return atpvCartItems.reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    );
  }, [atpvCartItems]);

  return (
    <View style={Styles.wall}>
      <View style={Styles.backArrowContainer}>
        <ArrowBack />
        <View style={Styles.TitleContainer}>
          <Text style={Styles.txtTitle}>Cart</Text>
        </View>
      </View>

      <View style={Styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={Styles.cartItemsContainer}>
          {atpvCartItems.map((item, index) => (
            <CartItem
              key={`${item.productID}_${item.size}_${index}`}
              item={item}
            />
          ))}
        </ScrollView>

        <FastImage
          resizeMode="contain"
          style={Styles.frameContainer}
          source={images.FrameContainer}>
          <Text style={Styles.txtTitlePrice}>Subtotal</Text>
          <Text style={Styles.txtPrice}>${totalPrice.toFixed(2)}</Text>
        </FastImage>

        <FastImage
          resizeMode="contain"
          style={Styles.frameContainer}
          source={images.FrameContainer}>
          <Text style={Styles.txtTitlePrice}>Total</Text>
          <Text style={Styles.txtPrice}>${totalPrice.toFixed(2)}</Text>
        </FastImage>

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('CartNavigator', {
              screen: 'CheckOut',
            });
          }}>
          <View style={Styles.checkOutButton}>
            <Text style={Styles.txtCheckOut}>CheckOut</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
