import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {Styles} from '../styles/Product';
import {typCart, typProduct} from '../Content/Types';
import {images} from '../Content/resources';
import FastImage from 'react-native-fast-image';
import {enmSize} from '../Content/Enums';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../redux/store';
import {addFavourite, removeFavourite} from '../redux/slices/favouriteSlice';
import {
  addToCartFirebase,
  updateCartItemFirebase,
} from '../redux/slices/cartSlice';
import {getUserID} from '../services/Authentication';

export function Product({product}: {product: typProduct}) {
  const strUserID = getUserID();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();

  const favouriteIds = useSelector((state: RootState) => state.favourite.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isFavourite = favouriteIds.includes(product.ID);

  const toggleFavouritelist = () => {
    if (!strUserID) {
      return;
    }

    if (isFavourite) {
      dispatch(removeFavourite({userId: strUserID, productId: product.ID}));
    } else {
      dispatch(addFavourite({userId: strUserID, productId: product.ID}));
    }
  };

  const isInCart = cartItems.some(
    item => item.productID === product.ID && item.size === enmSize.small,
  );

  const handleCartAction = async () => {
    if (!strUserID || !product) {
      return;
    }
    const existingCartItem: typCart | undefined = cartItems.find(
      item => item.productID === product.ID && item.size === enmSize.small,
    );
    if (isInCart) {
      await dispatch(
        updateCartItemFirebase({
          Uid: strUserID,
          productID: product.ID,
          oldSize: enmSize.small,
          newSize: enmSize.small,
          newCount: existingCartItem?.count! + 1,
        }),
      );
    } else {
      await dispatch(
        addToCartFirebase({
          Uid: strUserID,
          productID: product.ID,
          size: enmSize.small,
          count: 1,
          price: product.price, // ✅ pass price here
        }),
      );
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('ShoppingNavigator', {
          screen: 'ProductDetails',
          params: {ProductId: product.ID, blnIsFavouriteClicked: isFavourite},
        });
      }}>
      <View style={Styles.catProductSubContainer}>
        <View style={Styles.catProductImg}>
          <FastImage
            resizeMode="cover"
            style={Styles.catProductImg}
            source={{uri: product?.image[0] || ''}}
          />
          <TouchableWithoutFeedback
            onPress={toggleFavouritelist}
            hitSlop={{bottom: 20, top: 20, right: 20, left: 20}}>
            <View style={Styles.favouriteListImgContainer}>
              <FastImage
                resizeMode="contain"
                style={Styles.favouriteListIcon}
                source={
                  isFavourite ? images.inFavouriteList : images.outFavouriteList
                }
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={Styles.catProdDetailsContainer}>
          <View style={Styles.catProdDetailsSubContainer}>
            <Text style={Styles.txtProdCat}>{product?.title}</Text>
            <Text style={Styles.txtProdDesc}>{product?.description}</Text>
            <Text style={Styles.txtProdPrice}>${product?.price}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              handleCartAction();
            }}>
            <FastImage
              resizeMode="contain"
              style={Styles.productPlusIcon}
              source={images.ProductPlus}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
