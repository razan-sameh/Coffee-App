import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Styles } from '../styles/Cart';
import { images } from '../Content/resources';
import FastImage from 'react-native-fast-image';
import { ArrowBack } from '../Components/ArrowBack';
import { getUserID } from '../Content/Authentication';
import { typCart, typProduct } from '../Content/Types';
import { addItemInCart, decreaseCountItemInCart, getCartItems, getProductById, removeItemFromCart } from '../Content/Database';

export function Cart(navigation: any) {
    const [atpvCartItems, setCartItems] = useState<typCart[]>();
    const strUserID = getUserID();

    useEffect(() => {
        if (strUserID) {
            getCartItems(strUserID, (cartItems: typCart[]) => {
                console.log('Cart items:', cartItems);
                if (cartItems && cartItems.length > 0) {
                    setCartItems(cartItems);
                }
            });
        }
    }, [strUserID]);

    interface CartItemProps {
        item: typCart;
    }
    
    function CartItem({ item }: CartItemProps) {
        const [tpvProduct, setProduct] = useState<typProduct | null>(null);
    
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(item.productID);
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        useEffect(() => {
            fetchProduct();
        }, [item.productID]);

        if (!tpvProduct) {
            return null; // or a loading indicator
        }
    
        return (
            <View style={Styles.cartItemContainer}>
            <View style={Styles.ItemDetailsContainer}>
                <FastImage resizeMode='cover' style={Styles.cartItemImg}
                source={{ uri: tpvProduct.image[0] || '' }}/>
                <View>
                    <Text style={Styles.txtItemName}>{tpvProduct.title}</Text>
                    <Text style={Styles.txtItemPrice}>$ {tpvProduct.price}</Text>
                </View>
            </View>
            <View style={Styles.itemCountContainer}>
                <View style={Styles.itemCountSubContainer}>
                    <TouchableWithoutFeedback onPress={() => { decreaseCountItemInCart(item.Uid,tpvProduct.ID)}}>
                        <View style={Styles.minusContainer}>
                            <Text style={Styles.txtMinus}>-</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={Styles.countContainer}>
                        <Text style={Styles.txtCount}>{item.count}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => { addItemInCart(item.Uid,tpvProduct.ID,item.size) }}>
                        <View style={Styles.plusContainer}>
                            <Text style={Styles.txtPlus}>+</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={() => { removeItemFromCart(item.Uid,tpvProduct.ID) }}>
                    <View style={Styles.DeleteItemContainer}>
                        <FastImage resizeMode='contain' style={Styles.deleteCartItemImg} source={images.DeleteCartItem} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
        );
    } 
    
    return (
        <View style={Styles.wall}>
            <View style={Styles.backArrowContainer}>
                <ArrowBack />
                <View style={Styles.TitleContainer}>
                    <Text style={Styles.txtTitle}>Cart</Text>
                </View>
            </View>
            <View style={Styles.mainContainer}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    style={Styles.cartItemsContainer}
                >
                    {atpvCartItems?.map((item: typCart, index: number) => {
                        return (
                            <CartItem key={index} item={item} />
                        );
                    })}
                </ScrollView>
                <FastImage resizeMode='contain' style={Styles.frameContainer} source={images.FrameContainer} >
                    <Text style={Styles.txtTitlePrice}>Subtotal</Text>
                    <Text style={Styles.txtPrice}>$29.5</Text>
                </FastImage>
                <FastImage resizeMode='contain' style={Styles.frameContainer} source={images.FrameContainer} >
                    <Text style={Styles.txtTitlePrice}>Total</Text>
                    <Text style={Styles.txtPrice}>$19.5</Text>
                </FastImage>
                <TouchableWithoutFeedback >
                    <View style={Styles.checkOutButton}>
                        <Text style={Styles.txtCheckOut}>CheckOut</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}
