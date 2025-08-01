import React, {useEffect, useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {Styles} from '../styles/ProductDetails';
import {images} from '../Content/resources';
import {CustomCarousel} from '../Components/CustomCarousel';
import {Rating} from 'react-native-ratings';
import {strSecondColor, widthScale} from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import {typProduct} from '../Content/Types';
import {enmSize} from '../Content/Enums';
import {
  setItemsInFavourite,
  removeItemFromFavourite,
  addItemInCart,
  getCartItemDetails,
  updateItemInCart,
} from '../Content/Database';
import {getUserID} from '../Content/Authentication';
import database from '@react-native-firebase/database';
import {ArrowBack} from '../Components/ArrowBack';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

export function ProductDetails(navigation: any) {
  const tpvProduct: typProduct = navigation.navigation.route.params.product;
  const size: enmSize = navigation.navigation.route.params.size;
  const count: number = navigation.navigation.route.params.count;
  const isFavouriteClicked: boolean =
    navigation.navigation.route.params.blnIsFavouriteClicked;
  const strUserID = getUserID();
  const [enmSelectedSize, setSelectedSize] = useState<enmSize>(enmSize.small);
  const [intProductCount, setProductCount] = useState<number>(count || 1);
  const [blnIsFavouriteClicked, setFavouriteClicked] =
    useState<boolean>(isFavouriteClicked);
  const [blnIsAdded, setAdded] = useState<boolean>(false);
  const navigationTo: NavigationProp<ParamListBase> = useNavigation();

  useEffect(() => {
    setFavouriteClicked(isFavouriteClicked);
  }, [isFavouriteClicked]);

  useEffect(() => {
    if (strUserID) {
      database()
        .ref(`favourite/${strUserID}`)
        .on('value', snapshot => {
          if (snapshot.exists()) {
            const aintProductsID = snapshot.val().Products;
            if (aintProductsID != undefined) {
              if (aintProductsID.includes(tpvProduct.ID)) {
                setFavouriteClicked(true);
              } else {
                setFavouriteClicked(false);
              }
            } else {
              setFavouriteClicked(false);
            }
          }
        });
    }
  }, [strUserID]);

  useEffect(() => {
    if (strUserID && size && count) {
      getCartItemDetails(strUserID, tpvProduct.ID, size, itemDetails => {
        if (itemDetails) {
          setProductCount(itemDetails.count);
          setSelectedSize(itemDetails.size);
        }
      });
    } else {
      setProductCount(1);
      setSelectedSize(enmSize.small);
    }
  }, [strUserID, tpvProduct]);

  useEffect(() => {
    if (blnIsAdded) {
      navigationTo.navigate('Cart');
      setAdded(false);
    }
  }, [blnIsAdded]);

  const toggleFavouritelist = () => {
    if (!blnIsFavouriteClicked && strUserID) {
      setItemsInFavourite(strUserID, tpvProduct.ID);
      setFavouriteClicked(true);
    } else if (blnIsFavouriteClicked && strUserID) {
      removeItemFromFavourite(strUserID, tpvProduct.ID);
      setFavouriteClicked(false);
    }
  };

  function addToCart() {
    if (strUserID) {
      addItemInCart(strUserID, tpvProduct.ID, enmSelectedSize, intProductCount);
      setAdded(true);
    }
  }

  function updateCart() {
    if (strUserID) {
      updateItemInCart(
        strUserID,
        tpvProduct.ID,
        size,
        enmSelectedSize,
        intProductCount,
      );
      setAdded(true);
    }
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
          {blnIsFavouriteClicked ? (
            <FastImage
              resizeMode="contain"
              style={Styles.favouriteListButton}
              source={images.inFavouriteList}
            />
          ) : (
            <FastImage
              resizeMode="contain"
              style={Styles.favouriteListButton}
              source={images.outFavouriteList}
            />
          )}
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
          readonly={true}
          style={Styles.rating}
        />
        <View style={Styles.ProductDesContainer}>
          <Text style={Styles.txtTitles}>Product Details</Text>
          <Text style={Styles.txtproductDes}>{tpvProduct.description}</Text>
        </View>
        <View style={Styles.productSizeContainer}>
          <Text style={Styles.txtTitles}>Select Size</Text>
          <View style={Styles.productSizeBtnContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                setSelectedSize(enmSize.small);
              }}>
              <View
                style={
                  enmSelectedSize == enmSize.small
                    ? Styles.productSizeBtnSelected
                    : Styles.productSizeBtn
                }>
                <Text
                  style={
                    enmSelectedSize == enmSize.small
                      ? Styles.txtProductSizeSelected
                      : Styles.txtProductSize
                  }>
                  S
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setSelectedSize(enmSize.medium);
              }}>
              <View
                style={
                  enmSelectedSize == enmSize.medium
                    ? Styles.productSizeBtnSelected
                    : Styles.productSizeBtn
                }>
                <Text
                  style={
                    enmSelectedSize == enmSize.medium
                      ? Styles.txtProductSizeSelected
                      : Styles.txtProductSize
                  }>
                  M
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setSelectedSize(enmSize.large);
              }}>
              <View
                style={
                  enmSelectedSize == enmSize.large
                    ? Styles.productSizeBtnSelected
                    : Styles.productSizeBtn
                }>
                <Text
                  style={
                    enmSelectedSize == enmSize.large
                      ? Styles.txtProductSizeSelected
                      : Styles.txtProductSize
                  }>
                  L
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setSelectedSize(enmSize.xLarge);
              }}>
              <View
                style={
                  enmSelectedSize == enmSize.xLarge
                    ? Styles.productSizeBtnSelected
                    : Styles.productSizeBtn
                }>
                <Text
                  style={
                    enmSelectedSize == enmSize.xLarge
                      ? Styles.txtProductSizeSelected
                      : Styles.txtProductSize
                  }>
                  XL
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={Styles.productCountContainer}>
          <View style={Styles.txtProductCountTitle}>
            <Text style={Styles.txtTitles}>Select Drink: </Text>
            <Text style={Styles.txtProductNameCount}>{tpvProduct.title}</Text>
          </View>
          <View style={Styles.productCountBtnContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                setProductCount(intProductCount + 1);
              }}>
              <View style={Styles.plusContainer}>
                <Text style={Styles.txtProductCountBtn}>+</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={Styles.productCount}>
              <Text style={Styles.txtProductCount}>{intProductCount}</Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                intProductCount > 1
                  ? setProductCount(intProductCount - 1)
                  : null;
              }}>
              <View style={Styles.plusContainer}>
                <Text style={Styles.txtProductCountBtn}>-</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => (size && count ? updateCart() : addToCart())}>
          <View style={Styles.addToCartButton}>
            <Text style={Styles.txtAddToCart}>
              {size && count ? 'Update Cart' : 'Add to cart'}
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
