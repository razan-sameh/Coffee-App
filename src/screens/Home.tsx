import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Styles } from '../styles/Home';
import { images } from '../Content/resources';
import { getTopRatedProduct } from '../Content/Utils';
import { getCategory, getProduct } from '../Content/Firebase';
import { typCategory, typProduct } from '../Content/Types';
import { Product } from '../Components/Product';
import FastImage from 'react-native-fast-image';

export function Home({...props}:any) {
  const [aobjFilteredProducts, setFilteredProducts] = useState<typProduct[]>([]);
  const [aobjCategories, setCategory] = useState<typCategory[]>([]);

  useEffect(() => {
    fetchCategoryData();
    fetchProductsData();
  }, []);

  const fetchCategoryData = async () => {
    const aobjCategories: typCategory[] = await getCategory();
    setCategory(aobjCategories)
  }

  const fetchProductsData = async () => {
    const aobjProducts: typProduct[] = await getTopRatedProduct();
    setFilteredProducts(aobjProducts);    
  };

  return (
    <View style={Styles.wall}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        style={Styles.mainContainer}
      >
        <Text style={Styles.catTitle}>Category</Text>
        <View style={Styles.catContainer}>
        <ScrollView
          nestedScrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {aobjCategories.map((category: any, index) => {
            return (
              <TouchableWithoutFeedback
                key={category.ID}
                onPress={() => {
                  props.navigation.navigate('ShoppingNavigator', {
                    screen: 'Shopping',
                    params: { categoryID: category.ID }
                  })
                  }}
                >
                <View
                  style={Styles.catItem}
                >
                  <Text style={Styles.txtCat}>{category.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
        </View>
        <View style={Styles.catProductContainer}>
          <Text style={Styles.catProductTitle}>Top Rated</Text>
        <ScrollView
          nestedScrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {aobjFilteredProducts.map((product: any, index) => {
            return (
              <Product key={product.ID} product={product} navigation={props}/>
            );
          })}
        </ScrollView>
        </View>
        <View style={Styles.offerTitleContainer}>
          <Text style={Styles.txtOfferTitle}>Special Offer</Text>
          <FastImage source={images.OffersIcon} resizeMode='contain' style={Styles.OffersIcon}/>
        </View>
        <View style={Styles.offerItemsContainer}>
          <FastImage resizeMode='cover' style={Styles.offerItemImg} source={images.offer1} />
          <View>
            <Text style={Styles.txtProdPriceofferItemTitle}>Discount</Text>
            <Text style={Styles.txtofferItemDesc}>It is a long established fact that a reader will be distracted by the readable content</Text>
          </View>
        </View>
        <View style={Styles.offerItemsContainer}>
          <FastImage resizeMode='cover' style={Styles.offerItemImg} source={images.offer2} />
          <View>
            <Text style={Styles.txtProdPriceofferItemTitle}>Discount</Text>
            <Text style={Styles.txtofferItemDesc}>It is a long established fact that a reader will be distracted by the readable content</Text>
          </View>
        </View>
        <View style={Styles.offerItemsContainer}>
          <FastImage resizeMode='cover' style={Styles.offerItemImg} source={images.offer3} />
          <View>
            <Text style={Styles.txtProdPriceofferItemTitle}>Discount</Text>
            <Text style={Styles.txtofferItemDesc}>It is a long established fact that a reader will be distracted by the readable content</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


