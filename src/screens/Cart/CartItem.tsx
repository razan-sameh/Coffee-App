import {useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  getProductById,
  decreaseCountItemInCart,
  addItemInCart,
  removeItemFromCart,
} from '../../Content/Database';
import {images} from '../../Content/resources';
import {typCart, typProduct} from '../../Content/Types';
import {Styles} from '../../styles/Cart';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

interface CartItemProps {
  item: typCart;
}

export function CartItem({item}: CartItemProps) {
  const [tpvProduct, setProduct] = useState<typProduct>();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const fetchProduct = async () => {
    try {
      const productData = await getProductById(item.productID);
      setProduct(productData);
      // setItemPrice(productData.price * item.count)
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [item.productID]);

  return (
    tpvProduct && (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('ShoppingNavigator', {
            screen: 'ProductDetails',
            params: {product: tpvProduct, size: item.size, count: item.count},
          });
        }}>
        <View style={Styles.cartItemContainer}>
          <View style={Styles.ItemDetailsContainer}>
            <FastImage
              resizeMode="cover"
              style={Styles.cartItemImg}
              source={{uri: tpvProduct.image[0] || ''}}
            />
            <View>
              <Text style={Styles.txtItemName}>{tpvProduct.title}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={Styles.txtItemName}>Size: </Text>
                <Text style={Styles.txtItemName}>{item.size}</Text>
              </View>
              <Text style={Styles.txtItemPrice}>$ {item.price.toFixed(2)}</Text>
            </View>
          </View>
          <View style={Styles.itemCountContainer}>
            <View style={Styles.itemCountSubContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  decreaseCountItemInCart(item.Uid, tpvProduct.ID, item.size);
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
                  addItemInCart(item.Uid, tpvProduct.ID, item.size);
                }}>
                <View style={Styles.plusContainer}>
                  <Text style={Styles.txtPlus}>+</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                removeItemFromCart(item.Uid, tpvProduct.ID, item.size);
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
    )
  );
}
