import React, {useEffect, useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {Styles} from '../styles/ProductDetails';
import {images} from '../Content/resources';
import {CustomCarousel} from '../Components/CustomCarousel';
import {Rating} from 'react-native-ratings';
import {strSecondColor, widthScale} from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import {enmSize} from '../Content/Enums';
import {
  setItemsInFavourite,
  removeItemFromFavourite,
} from '../Content/Database';
import {getUserID} from '../Content/Authentication';
import database from '@react-native-firebase/database';
import {ArrowBack} from '../Components/ArrowBack';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useGetProductByIdQuery} from '../services/firebaseApi';
import {
  addToCartFirebase,
  updateCartItemFirebase,
} from '../redux/slices/cartSlice';
import {RootState, useAppDispatch} from '../redux/store';
import {useSelector} from 'react-redux';

export function ProductDetails(navigation: any) {
  const ProductId: string = navigation.navigation.route.params.ProductId;
  const isFavouriteClicked: boolean =
    navigation.navigation.route.params.blnIsFavouriteClicked;
  const strUserID = getUserID();
  const appDispatch = useAppDispatch();
  const navigationTo: NavigationProp<ParamListBase> = useNavigation();
  const {data: tpvProduct, isLoading} = useGetProductByIdQuery(ProductId);
  const [blnIsFavouriteClicked, setFavouriteClicked] =
    useState<boolean>(isFavouriteClicked);
  const [blnIsInCart, setIsInCart] = useState<boolean>(false);
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(item => item.productID === tpvProduct?.ID),
  );

  const oldsize = cartItem?.size;
  const [enmSelectedSize, setSelectedSize] = useState<enmSize>(enmSize.small);
  const [intProductCount, setProductCount] = useState<number>(1);

  useEffect(() => {
    setFavouriteClicked(isFavouriteClicked);
  }, [isFavouriteClicked]);

  useEffect(() => {
    if (strUserID && tpvProduct) {
      database()
        .ref(`favourite/${strUserID}`)
        .on('value', snapshot => {
          if (snapshot.exists()) {
            const aintProductsID = snapshot.val().Products;
            setFavouriteClicked(aintProductsID?.includes(tpvProduct.ID));
          } else {
            setFavouriteClicked(false);
          }
        });
    }
  }, [strUserID, tpvProduct]);

  useEffect(() => {
    if (cartItem) {
      setProductCount(cartItem.count);
      setIsInCart(true);
      setSelectedSize(cartItem.size);
    } else {
      setSelectedSize(enmSize.small);
      setProductCount(1);
      setIsInCart(false);
    }
  }, [cartItem, ProductId]);

  const toggleFavouritelist = () => {
    if (!blnIsFavouriteClicked && strUserID && tpvProduct) {
      setItemsInFavourite(strUserID, tpvProduct.ID);
      setFavouriteClicked(true);
    } else if (blnIsFavouriteClicked && strUserID && tpvProduct) {
      removeItemFromFavourite(strUserID, tpvProduct.ID);
      setFavouriteClicked(false);
    }
  };

  const handleCartAction = async () => {
    if (!strUserID || !tpvProduct) {
      return;
    }
    let result;
    if (blnIsInCart) {
      result = await appDispatch(
        updateCartItemFirebase({
          Uid: strUserID,
          productID: tpvProduct.ID,
          oldSize: oldsize || enmSize.small,
          newSize: enmSelectedSize,
          newCount: intProductCount,
        }),
      );
    } else {
      result = await appDispatch(
        addToCartFirebase({
          Uid: strUserID,
          productID: tpvProduct.ID,
          size: enmSelectedSize,
          count: intProductCount,
        }),
      );
    }
    if (
      addToCartFirebase.fulfilled.match(result) ||
      updateCartItemFirebase.fulfilled.match(result)
    ) {
      navigationTo.navigate('CartNavigator', {
        screen: 'Cart',
      });
    } else {
      console.warn('Cart update failed:', result.payload);
    }
  };

  if (isLoading || !tpvProduct) {
    return (
      <View style={Styles.wall}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={Styles.wall}>
      <FastImage
        resizeMode="contain"
        style={Styles.wallCoffeeImage1}
        source={images.ProDetailsWallCoffee1}
      />
      <FastImage
        resizeMode="contain"
        style={Styles.wallCoffeeImage2}
        source={images.ProDetailsWallCoffee2}
      />
      <View style={Styles.headerContainer}>
        <ArrowBack />
        <TouchableWithoutFeedback onPress={toggleFavouritelist}>
          <FastImage
            resizeMode="contain"
            style={Styles.favouriteListButton}
            source={
              blnIsFavouriteClicked
                ? images.inFavouriteList
                : images.outFavouriteList
            }
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={Styles.carouselContainer}>
        <CustomCarousel productImages={tpvProduct.image} />
      </View>
      <View style={Styles.contentContainer}>
        <View style={Styles.NameAndPriceContainer}>
          <Text style={Styles.txtTitles}>{tpvProduct.title}</Text>
          <Text style={Styles.txtProductPrice}>${tpvProduct.price}</Text>
        </View>
        <Rating
          type="custom"
          ratingBackgroundColor="#A19D9D"
          ratingCount={5}
          imageSize={widthScale(19)}
          startingValue={tpvProduct.rate}
          tintColor="#251919"
          readonly
          style={Styles.rating}
        />
        <View style={Styles.ProductDesContainer}>
          <Text style={Styles.txtTitles}>Product Details</Text>
          <Text style={Styles.txtproductDes}>{tpvProduct.description}</Text>
        </View>
        <View style={Styles.productSizeContainer}>
          <Text style={Styles.txtTitles}>Select Size</Text>
          <View style={Styles.productSizeBtnContainer}>
            {[enmSize.small, enmSize.medium, enmSize.large, enmSize.xLarge].map(
              sizeVal => (
                <TouchableWithoutFeedback
                  key={sizeVal}
                  onPress={() => setSelectedSize(sizeVal)}>
                  <View
                    style={
                      enmSelectedSize === sizeVal
                        ? Styles.productSizeBtnSelected
                        : Styles.productSizeBtn
                    }>
                    <Text
                      style={
                        enmSelectedSize === sizeVal
                          ? Styles.txtProductSizeSelected
                          : Styles.txtProductSize
                      }>
                      {sizeVal.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ),
            )}
          </View>
        </View>
        <View style={Styles.productCountContainer}>
          <View style={Styles.txtProductCountTitle}>
            <Text style={Styles.txtTitles}>Select Drink: </Text>
            <Text style={Styles.txtProductNameCount}>{tpvProduct.title}</Text>
          </View>
          <View style={Styles.productCountBtnContainer}>
            <TouchableWithoutFeedback
              onPress={() => setProductCount(intProductCount + 1)}>
              <View style={Styles.plusContainer}>
                <Text style={Styles.txtProductCountBtn}>+</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={Styles.productCount}>
              <Text style={Styles.txtProductCount}>{intProductCount}</Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() =>
                intProductCount > 1 && setProductCount(intProductCount - 1)
              }>
              <View style={Styles.plusContainer}>
                <Text style={Styles.txtProductCountBtn}>-</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleCartAction}>
          <View style={Styles.addToCartButton}>
            <Text style={Styles.txtAddToCart}>
              {blnIsInCart ? 'Update Cart' : 'Add to Cart'}
            </Text>
            <FastImage
              style={Styles.cartIcon}
              resizeMode="contain"
              tintColor={strSecondColor}
              source={images.CartIcon}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
