import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Styles} from '../styles/Cart';
import {images} from '../Content/resources';
import FastImage from 'react-native-fast-image';
import {ArrowBack} from '../Components/ArrowBack';
import {getUserID} from '../Content/Authentication';
import {typCart} from '../Content/Types';
import {getCartItems} from '../Content/Database';
import {CartItem} from './Cart/CartItem';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

export function Cart() {
  const [atpvCartItems, setCartItems] = useState<typCart[]>();
  const strUserID = getUserID();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    if (strUserID) {
      getCartItems(strUserID, (cartItems: typCart[]) => {
        console.log('Cart items:', cartItems);
        if (cartItems && cartItems.length > 0) {
          setCartItems(cartItems);
          let totalPriceCalc: number = 0;
          cartItems.forEach((item: typCart) => {
            totalPriceCalc += item.price;
          });
          setTotalPrice(totalPriceCalc);
        }
      });
    }
  }, [strUserID]);

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
          scrollEnabled={true}
          style={Styles.cartItemsContainer}>
          {atpvCartItems?.map((item: typCart, index: number) => {
            return <CartItem key={index} item={item} />;
          })}
        </ScrollView>
        <FastImage
          resizeMode="contain"
          style={Styles.frameContainer}
          source={images.FrameContainer}>
          <Text style={Styles.txtTitlePrice}>Subtotal</Text>
          <Text style={Styles.txtPrice}>$ {totalPrice.toFixed(2)}</Text>
        </FastImage>
        <FastImage
          resizeMode="contain"
          style={Styles.frameContainer}
          source={images.FrameContainer}>
          <Text style={Styles.txtTitlePrice}>Total</Text>
          <Text style={Styles.txtPrice}>$ {totalPrice.toFixed(2)}</Text>
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
