import React, {useEffect, useMemo, useRef} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  SectionList,
  Text,
  View,
} from 'react-native';
import {Styles} from '../styles/Favourite';
import {Product} from '../Components/Product';
import {ArrowBack} from '../Components/ArrowBack';
import {RootState, useAppDispatch} from '../redux/store';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {typProduct} from '../Content/Types';
import {useGetProductsQuery} from '../services/firebaseApi';
import {strSecondColor} from '../styles/responsive';
import {getUserID} from '../services/Authentication';

export function Favourite() {
  const dispatch = useAppDispatch();
  const objListRef = useRef<SectionList>(null);
  const strUserID = getUserID();

  // Fetch favourite product IDs from Firebase
  const productIDs = useSelector((state: RootState) => state.favourite.items);

  // Fetch all products from RTK Query cache or backend
  const isFetchingFavourites = useSelector(
    (state: RootState) => state.favourite.loading,
  );
  const {data: allProducts = [], isLoading: isLoadingProducts} =
    useGetProductsQuery();
  const isLoading = isFetchingFavourites || isLoadingProducts;

  // Fetch favourite product IDs once
  useEffect(() => {
    if (!strUserID) {
      return;
    }

    const ref = database().ref(`favourite/${strUserID}`);

    const onValueChange = ref.on('value', (snapshot: {val: () => any}) => {
      const data = snapshot.val();
      const products: typProduct[] = data?.Products || [];

      dispatch({
        type: 'favourite/fetchFavourites/fulfilled',
        payload: products,
      });
    });

    return () => {
      ref.off('value', onValueChange);
    };
  }, [dispatch, strUserID]);

  // Memoize the filtered list of favorite products
  const favouriteProducts = useMemo(() => {
    return allProducts.filter(p => productIDs.includes(p.ID));
  }, [allProducts, productIDs]);

  const sections = useMemo(() => {
    if (favouriteProducts.length === 0) {
      return [];
    }
    return [{title: 'Favourite Products', data: [favouriteProducts]}];
  }, [favouriteProducts]);

  const renderRow = ({item}: {item: typeof favouriteProducts}) => (
    <View style={Styles.productContainer}>
      {item.map((product: typProduct, index: number) => (
        <Product key={index} product={product} />
      ))}
    </View>
  );

  return (
    <View style={Styles.wall}>
      <View style={Styles.backArrowContainer}>
        <ArrowBack />
      </View>
      {isLoading ? (
        <View style={Styles.loadingContainer}>
          <ActivityIndicator size={20} color={strSecondColor} />
        </View>
      ) : sections.length === 0 ? (
        <View style={Styles.noDataContainer}>
          <Text style={Styles.noDataText}>There is no favourite items</Text>
        </View>
      ) : (
        <SafeAreaView>
          <SectionList
            ref={objListRef}
            sections={sections}
            keyExtractor={(_, index) => index.toString()}
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
