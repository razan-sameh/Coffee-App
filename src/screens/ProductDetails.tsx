import React, { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Styles } from '../styles/ProductDetails';
import { images } from '../Content/resources';
import { CustomCarousel } from '../Components/CustomCarousel';
import { Rating } from 'react-native-ratings';
import { strSecondColor, widthScale } from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import { typProduct } from '../Content/Types';
import { Size } from '../Content/Enums';

export function ProductDetails(navigation: any) {
    const tpvProduct: typProduct = navigation.navigation.route.params.objProduct
    const [enmSelectedSize, setSelectedSize] = useState<Size>(Size.small);
    const [intProductCount, setProductCount] = useState<number>(1);


    return (
        <View style={Styles.wall}>
            <FastImage resizeMode='contain' style={Styles.wallCoffeeImage1} source={images.ProDetailsWallCoffee1} />
            <FastImage resizeMode='contain' style={Styles.wallCoffeeImage2} source={images.ProDetailsWallCoffee2} />
            <View style={Styles.headerContainer}>
                <TouchableWithoutFeedback>
                    <FastImage style={Styles.arrowBackIcon} resizeMode='contain' source={images.ArrowBack} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <FastImage style={Styles.wishListButton} resizeMode='contain' source={images.WishListButton} />
                </TouchableWithoutFeedback>
            </View>
            <View style={Styles.carouselContainer}>
                <CustomCarousel productImages={tpvProduct.image} />
            </View>
            <View style={Styles.contentContainer}>
                <View style={Styles.NameAndPriceContainer}>
                    <Text style={Styles.txtTitles}>{tpvProduct.title}</Text>
                    <Text style={Styles.txtProductPrice}>${tpvProduct.price}</Text>
                </View>
                <Rating
                    type='custom'
                    ratingBackgroundColor='#A19D9D'
                    ratingCount={5}
                    imageSize={widthScale(19)}
                    startingValue={tpvProduct.rate}
                    tintColor='#251919'
                    readonly={true}
                    style={Styles.rating}
                />
                <View style={Styles.ProductDesContainer}>
                    <Text style={Styles.txtTitles}>Product Details</Text>
                    <Text style={Styles.txtproductDes}>
                        {tpvProduct.description}
                    </Text>
                </View>
                <View style={Styles.productSizeContainer}>
                    <Text style={Styles.txtTitles}>Select Size</Text>
                    <View style={Styles.productSizeBtnContainer}>
                        <TouchableWithoutFeedback onPress={() => { setSelectedSize(Size.small) }}>
                            <View style={enmSelectedSize == Size.small ? Styles.productSizeBtnSelected : Styles.productSizeBtn}>
                                <Text style={enmSelectedSize == Size.small ? Styles.txtProductSizeSelected : Styles.txtProductSize}>S</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { setSelectedSize(Size.medium) }}>
                            <View style={enmSelectedSize == Size.medium ? Styles.productSizeBtnSelected : Styles.productSizeBtn}>
                                <Text style={enmSelectedSize == Size.medium ? Styles.txtProductSizeSelected : Styles.txtProductSize}>M</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { setSelectedSize(Size.large) }}>
                            <View style={enmSelectedSize == Size.large ? Styles.productSizeBtnSelected : Styles.productSizeBtn}>
                                <Text style={enmSelectedSize == Size.large ? Styles.txtProductSizeSelected : Styles.txtProductSize}>L</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { setSelectedSize(Size.xLarge) }}>
                            <View style={enmSelectedSize == Size.xLarge ? Styles.productSizeBtnSelected : Styles.productSizeBtn}>
                                <Text style={enmSelectedSize == Size.xLarge ? Styles.txtProductSizeSelected : Styles.txtProductSize}>XL</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <View style={Styles.productCountContainer}>
                    <View style={Styles.txtProductCountTitle}>
                        <Text style={Styles.txtTitles}>Select Drink: </Text>
                        <Text style={Styles.txtProductNameCount}>{tpvProduct.title}</Text>
                    </View>
                    <View style={Styles.productCountBtnContainer}>
                        <TouchableWithoutFeedback onPress={() => { setProductCount(intProductCount + 1) }}>
                            <Text style={Styles.txtProductCountBtn}>+</Text>
                        </TouchableWithoutFeedback>
                        <View style={Styles.productCount}>
                            <Text style={Styles.txtProductCount}>{intProductCount}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => { intProductCount > 0 ? setProductCount(intProductCount - 1) : null }}>
                            <Text style={Styles.txtProductCountBtn}>-</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback>
                    <View style={Styles.addToCartButton}>
                        <Text style={Styles.txtAddToCart}>Add to cart</Text>
                        <FastImage style={Styles.cartIcon} resizeMode='contain' tintColor={strSecondColor} source={images.CartIcon} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}
