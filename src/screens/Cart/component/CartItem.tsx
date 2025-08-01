import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {images} from '../../../Content/resources';
import {typCart} from '../../../Content/Types';
import {
  decreaseFromCartFirebase,
  updateCartItemFirebase,
  removeFromCartFirebase,
} from '../../../redux/slices/cartSlice';
import {useAppDispatch} from '../../../redux/store';
import {useGetProductByIdQuery} from '../../../services/firebaseApi';
import {Styles} from '../../../styles/Cart';

interface CartItemProps {
  item: typCart;
}

export function CartItem({item}: CartItemProps) {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();

  const {
    data: tpvProduct,
    isLoading,
    isError,
  } = useGetProductByIdQuery(item.productID);

  if (!tpvProduct || isLoading || isError) {
    return null;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('ShoppingNavigator', {
          screen: 'ProductDetails',
          params: {ProductId: tpvProduct.ID},
        });
      }}>
      <View style={Styles.cartItemContainer}>
        <View style={Styles.ItemDetailsContainer}>
          <FastImage
            resizeMode="cover"
            style={Styles.cartItemImg}
            source={{uri: tpvProduct.image?.[0] || ''}}
          />
          <View>
            <Text style={Styles.txtItemName}>{tpvProduct.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={Styles.txtItemName}>Size: </Text>
              <Text style={Styles.txtItemName}>{item.size}</Text>
            </View>
            <Text style={Styles.txtItemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        </View>

        <View style={Styles.itemCountContainer}>
          <View style={Styles.itemCountSubContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (item.count > 1) {
                  dispatch(
                    decreaseFromCartFirebase({
                      Uid: item.Uid,
                      productID: item.productID,
                      size: item.size,
                    }),
                  );
                }
              }}>
              <View style={Styles.minusContainer}>
                <Text style={Styles.txtMinus}>-</Text>
              </View>
            </TouchableWithoutFeedback>

            <View style={Styles.countContainer}>
              <Text style={Styles.txtCount}>{item.count}</Text>
            </View>

            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(
                  updateCartItemFirebase({
                    Uid: item.Uid,
                    productID: item.productID,
                    oldSize: item.size,
                    newSize: item.size,
                    newCount: item.count + 1,
                  }),
                );
              }}>
              <View style={Styles.plusContainer}>
                <Text style={Styles.txtPlus}>+</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(
                removeFromCartFirebase({
                  Uid: item.Uid,
                  productID: item.productID,
                  size: item.size,
                }),
              );
            }}>
            <View style={Styles.DeleteItemContainer}>
              <FastImage
                resizeMode="contain"
                style={Styles.deleteCartItemImg}
                source={images.DeleteCartItem}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
