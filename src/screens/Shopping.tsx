import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, SafeAreaView, SectionList, View} from 'react-native';
import {Styles} from '../styles/Shopping';
import {typProduct} from '../Content/Types';
import {Product} from '../Components/Product';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {images} from '../Content/resources';
import FastImage from 'react-native-fast-image';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useGetProductsQuery} from '../services/firebaseApi';
import {strSecondColor} from '../styles/responsive';

export function Shopping() {
  const objListRef = useRef<SectionList>(null);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const filter = useSelector((state: RootState) => state.filter);
  const {data: allProducts = [], isLoading} = useGetProductsQuery();

  const [sections, setSections] = useState<
    {title: string; data: typProduct[][]}[]
  >([]);

  useEffect(() => {
    if (!isLoading && allProducts.length > 0) {
      const filtered = allProducts.filter(product => {
        const matchCategory =
          filter.categoryID.length === 0 ||
          filter.categoryID.includes(Number(product.category.ID));
        const matchPrice =
          product.price >= filter.intMinPrice &&
          product.price <= filter.intMaxPrice;
        const matchRating =
          product.rate >= filter.intMinRating &&
          product.rate <= filter.intMaxRating;

        return matchCategory && matchPrice && matchRating;
      });

      if (filter.strSearch?.trim()) {
        const keyword = filter.strSearch.toLowerCase();
        const searched = filtered.filter(
          product =>
            product.title.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword),
        );

        if (searched.length === 0) {
          navigation.navigate('ShoppingNavigator', {screen: 'NoResultSearch'});
        }

        setSections([{title: 'All Products', data: [searched]}]);
      } else {
        setSections([{title: 'All Products', data: [filtered]}]);
      }
    }
  }, [
    allProducts,
    filter.categoryID,
    filter.intMinPrice,
    filter.intMaxPrice,
    filter.intMinRating,
    filter.intMaxRating,
    filter.strSearch,
    isLoading,
    navigation,
  ]);

  const renderRow = useCallback(
    ({item}: {item: typProduct[]}) => (
      <View style={Styles.productContainer}>
        {item.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </View>
    ),
    [],
  );

  return (
    <View style={Styles.wall}>
      <TouchableOpacity
        style={Styles.filterContainer}
        onPress={() =>
          navigation.navigate('ShoppingNavigator', {
            screen: 'Filter',
          })
        }>
        <FastImage
          resizeMode="contain"
          style={Styles.filterIcon}
          source={images.FilterIcon}
        />
      </TouchableOpacity>

      {isLoading ? (
        <View style={[Styles.loadingContainer]}>
          <ActivityIndicator size="large" color={strSecondColor} />
        </View>
      ) : (
        <SafeAreaView>
          <SectionList
            ref={objListRef}
            sections={sections}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRow}
            style={Styles.mainContainer}
            removeClippedSubviews
            maxToRenderPerBatch={45}
            updateCellsBatchingPeriod={65}
            initialNumToRender={50}
            viewabilityConfig={{
              minimumViewTime: 500,
              itemVisiblePercentThreshold: 100,
              waitForInteraction: true,
            }}
          />
        </SafeAreaView>
      )}
    </View>
  );
}
