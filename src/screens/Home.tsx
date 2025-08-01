import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {Styles} from '../styles/Home';
import {images} from '../Content/resources';
import {Product} from '../Components/Product';
import FastImage from 'react-native-fast-image';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {typCategory, typProduct} from '../Content/Types';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../services/firebaseApi';
import {strPrimaryColor} from '../styles/responsive';
import ErrorScreen from './ErrorScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {navigationRef} from '../../App';
import {setCategoryID} from '../redux/slices/filterSlice';
import {useDispatch} from 'react-redux';

export function Home() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  // Fetch categories and products using RTK Query
  const {
    data: categories = [],
    isLoading: loadingCategories,
    isError: errorProd,
  } = useGetCategoriesQuery();

  const {
    data: products = [],
    isLoading: loadingProducts,
    isError: errorCat,
  } = useGetProductsQuery();

  // Filter top-rated products (rate >= 4)
  const topRatedProducts: typProduct[] = products.filter(
    product => product.rate >= 4,
  );

  if (loadingProducts || loadingCategories) {
    return (
      <View style={Styles.wall}>
        <ActivityIndicator size="large" color={strPrimaryColor} />
      </View>
    );
  }

  if (errorProd || errorCat) {
    return (
      <ErrorScreen
        onRetry={() => {
          navigationRef.navigate('DrawerNavigator', {
            screen: 'TapNavigator',
            params: {
              screen: 'Home',
            },
          });
        }}
      />
    );
  }

  return (
    <View style={Styles.wall}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        style={Styles.mainContainer}>
        {/* Categories */}
        <Text style={Styles.catTitle}>Category</Text>
        <View style={Styles.catContainer}>
          <ScrollView
            nestedScrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {!loadingCategories &&
              categories.map((category: typCategory) => (
                <TouchableWithoutFeedback
                  key={category.ID}
                  onPress={() => {
                    dispatch(setCategoryID([Number(category.ID)])); // Ensure it's a number
                    navigation.navigate('ShoppingNavigator', {
                      screen: 'Shopping',
                    });
                  }}>
                  <View style={Styles.catItem}>
                    <Text style={Styles.txtCat}>{category.title}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
          </ScrollView>
        </View>

        {/* Top Rated Products */}
        <View style={Styles.catProductContainer}>
          <Text style={Styles.catProductTitle}>Top Rated</Text>
          <ScrollView
            nestedScrollEnabled={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {!loadingProducts &&
              topRatedProducts.map((product: typProduct) => (
                <Product key={product.ID} product={product} />
              ))}
          </ScrollView>
        </View>

        {/* Offers Section */}
        <View style={Styles.offerTitleContainer}>
          <Text style={Styles.txtOfferTitle}>Special Offer</Text>
          <FastImage
            source={images.OffersIcon}
            resizeMode="contain"
            style={Styles.OffersIcon}
          />
        </View>

        {[images.offer1, images.offer2, images.offer3].map((img, index) => (
          <View key={index} style={Styles.offerItemsContainer}>
            <FastImage
              resizeMode="cover"
              style={Styles.offerItemImg}
              source={img}
            />
            <View>
              <Text style={Styles.txtProdPriceofferItemTitle}>Discount</Text>
              <Text style={Styles.txtofferItemDesc}>
                It is a long established fact that a reader will be distracted
                by the readable content
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
