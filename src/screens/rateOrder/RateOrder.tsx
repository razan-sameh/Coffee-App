import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ArrowBack} from '../../Components/ArrowBack';
import {Styles} from './RateOrderStyle';
import FastImage from 'react-native-fast-image';
import {
  useGetOrderByIdQuery,
  useGetProductsQuery,
  useUpdateProductRatingMutation,
} from '../../services/firebaseApi';
import {useRoute} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import {strPrimaryColor, widthScale} from '../../styles/responsive';

const RateOrder = () => {
  const route = useRoute<any>();
  const {orderId} = route.params;
  const {data: order, isLoading, error} = useGetOrderByIdQuery(orderId);
  const {data: products} = useGetProductsQuery();
  const [ratings, setRatings] = useState<{[key: string]: number}>({});
  const [updateProductRating, {isLoading: isUpdating}] =
    useUpdateProductRatingMutation();
  const uniqueItems = Array.from(
    new Map(order?.items.map(item => [item.productID, item])).values(),
  );
  const handleSubmit = async () => {
    try {
      for (const productId in ratings) {
        const newRate = ratings[productId];
        await updateProductRating({productId, newRate}).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView style={Styles.wall}>
      <ArrowBack />
      <Text style={Styles.txtTitle}>Rating</Text>

      {/* 🔹 Loader & Error placed INSIDE ScrollView */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={strPrimaryColor}
          style={{marginTop: 20}}
        />
      ) : error || !order ? (
        <Text style={{color: 'red', marginTop: 20}}>
          Error loading order or products
        </Text>
      ) : (
        <>
          {uniqueItems.map(item => {
            const product = products?.find(p => p.ID === item.productID);
            if (!product) return null;

            return (
              <View key={product.ID} style={Styles.card}>
                {/* Product Info */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FastImage
                    source={{uri: product.image[0]}}
                    style={{width: 60, height: 60, borderRadius: 8}}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={Styles.productTitle}>{product.title}</Text>
                    <Text style={Styles.productPrice}>${product.price}</Text>
                  </View>
                </View>

                {/* Rating Fields */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={Styles.label}>Product quality</Text>
                  <Rating
                    tintColor={strPrimaryColor}
                    startingValue={1}
                    type="custom"
                    ratingCount={5}
                    imageSize={widthScale(18)}
                    onFinishRating={(value: number) => {
                      setRatings(prev => ({...prev, [product.ID]: value}));
                    }}
                  />
                </View>
              </View>
            );
          })}

          <TouchableOpacity
            style={Styles.btn}
            onPress={handleSubmit}
            disabled={isUpdating}>
            <Text style={Styles.btnText}>
              {isUpdating ? 'Submitting...' : 'Send Review'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default RateOrder;
