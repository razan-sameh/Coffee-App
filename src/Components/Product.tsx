import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Styles } from '../styles/Product';
import { typProduct } from '../Content/Types';
import { images } from '../Content/resources';
import FastImage from 'react-native-fast-image';
import { getUserID } from '../Content/Authentication';
import { removeItemFromFavourite, setItemsInFavourite } from '../Content/Database';
import database from '@react-native-firebase/database';

export function Product({ product, navigation }: { product: typProduct } & { navigation: any }) {
    const [blnIsFavouriteClicked, setFavouriteClicked] = useState<boolean>(false);
    const strUserID = getUserID() 
    
    useEffect(() => {
        if (strUserID) {
            database().ref(`favourite/${strUserID}`).on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const aintProductsID = snapshot.val().Products;   
                    if (aintProductsID != undefined ) {
                        if (aintProductsID.includes(product.ID)) {
                            setFavouriteClicked(true);
                        }
                        else{
                            setFavouriteClicked(false);
                        }
                    }
                    else{
                        setFavouriteClicked(false);
                    }
                }
            });
        }
    }, []);

    const toggleFavouritelist = () => {
        if (!blnIsFavouriteClicked && strUserID) {
            setItemsInFavourite(strUserID,product.ID)
            setFavouriteClicked(true);
        }
        else if(blnIsFavouriteClicked && strUserID){
            removeItemFromFavourite(strUserID, product.ID);
            setFavouriteClicked(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            navigation.navigation.navigate('ShoppingNavigator',
                {
                    screen: 'ProductDetails',
                    params: { product ,blnIsFavouriteClicked}
                }
            )
        }}>
            <View style={Styles.catProductSubContainer}>
                <View style={Styles.catProductImg}>
                    <FastImage resizeMode='cover' style={Styles.catProductImg} source={{ uri: product?.image[0] || '' }} />
                    <TouchableWithoutFeedback onPress={toggleFavouritelist} hitSlop={{bottom:20,top:20,right:20,left:20}}>
                        <View style={Styles.favouriteListImgContainer} >
                            {blnIsFavouriteClicked ?
                                <FastImage resizeMode='contain' style={Styles.favouriteListIcon} source={images.inFavouriteList} />
                                : <FastImage resizeMode='contain' style={Styles.favouriteListIcon} source={images.outFavouriteList} />}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={Styles.catProdDetailsContainer}>
                    <View style={Styles.catProdDetailsSubContainer}>
                        <Text style={Styles.txtProdCat}>{product?.title}</Text>
                        <Text style={Styles.txtProdDesc}>{product?.description}</Text>
                        <Text style={Styles.txtProdPrice}>${product?.price}</Text>
                    </View>
                    <FastImage resizeMode='contain' style={Styles.productPlusIcon} source={images.ProductPlus} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
