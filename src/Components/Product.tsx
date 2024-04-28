import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Styles } from '../styles/Product';
import { typProduct } from '../Content/Types';
import { images } from '../Content/resources';
import FastImage from 'react-native-fast-image';
import { getUserID } from '../Content/Authentication';
import { isProductInFavouriteList, removeItemFromFavourite, setItemsInFavourite } from '../Content/Database';

export function Product({ product, navigation }: { product: typProduct } & { navigation: any }) {
    const [objProduct, setObjProduct] = useState<typProduct>(product);
    const [blnSsWishlistClicked, setWishlistClicked] = useState<boolean>(false);
    const strUserID = getUserID() 
    
    useEffect(() => {
        fetchProductInFavouriteList();
    }, []);

    const fetchProductInFavouriteList = async () => {
        if (strUserID) {
            const blnIsProductInFavouriteList: boolean = await isProductInFavouriteList(strUserID, product.ID);
            setWishlistClicked(blnIsProductInFavouriteList);
        }
    };
    

    const toggleWishlist = () => {
        setWishlistClicked(!blnSsWishlistClicked);
        if (!blnSsWishlistClicked && strUserID) {
            console.log('insert');
            setItemsInFavourite(strUserID,product.ID)
        }
        else if(blnSsWishlistClicked && strUserID){
            console.log('remove');
            removeItemFromFavourite(strUserID, product.ID);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            navigation.navigation.navigate('ShoppingNavigator',
                {
                    screen: 'ProductDetails',
                    params: { objProduct }
                }
            )
        }}>
            <View style={Styles.catProductSubContainer}>
                <View style={Styles.catProductImg}>
                    <FastImage resizeMode='cover' style={Styles.catProductImg} source={{ uri: objProduct?.image[0] || '' }} />
                    <TouchableWithoutFeedback onPress={toggleWishlist}>
                        <View style={Styles.wishListImgContainer} >
                            {blnSsWishlistClicked ?
                                <FastImage resizeMode='contain' style={Styles.wishListIcon} source={images.inWishList} />
                                : <FastImage resizeMode='contain' style={Styles.wishListIcon} source={images.outWishList} />}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={Styles.catProdDetailsContainer}>
                    <View style={Styles.catProdDetailsSubContainer}>
                        <Text style={Styles.txtProdCat}>{objProduct?.title}</Text>
                        <Text style={Styles.txtProdDesc}>{objProduct?.description}</Text>
                        <Text style={Styles.txtProdPrice}>${objProduct?.price}</Text>
                    </View>
                    <FastImage resizeMode='contain' style={Styles.productPlusIcon} source={images.ProductPlus} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
