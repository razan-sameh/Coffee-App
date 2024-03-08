import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Styles } from '../styles/Product';
import ProductPlus from '../assets/images/ProductPlus';
import { typProduct } from '../Content/Types';
import { images } from '../Content/resources';
import InWishListImg from '../assets/images/InWishListImg';
import OutWishListImg from '../assets/images/OutWishListImg';

export function Product({ product }: { product: typProduct }) {
    const [objProduct, setObjProduct] = useState<typProduct>(product);
    const [isWishlistClicked, setIsWishlistClicked] = useState<boolean>(false);

    const toggleWishlist = () => {
        setIsWishlistClicked(!isWishlistClicked);
    };
    
    return (
        <TouchableWithoutFeedback>
            <View style={Styles.catProductSubContainer}>
                <View style={Styles.catProductImg}>
                <Image style={Styles.catProductImg} source={{uri: objProduct?.image[0] || ''}} />
                    <TouchableWithoutFeedback onPress={toggleWishlist}>
                        <View style={Styles.wishListImg} >
                            {isWishlistClicked ? <InWishListImg /> : <OutWishListImg />}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={Styles.catProdDetailsContainer}>
                    <View style={Styles.catProdDetailsSubContainer}>
                        <Text style={Styles.txtProdCat}>{objProduct?.title}</Text>
                        <Text style={Styles.txtProdDesc}>{objProduct?.description}</Text>
                        <Text style={Styles.txtProdPrice}>${objProduct?.price}</Text>
                    </View>
                    <ProductPlus />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
