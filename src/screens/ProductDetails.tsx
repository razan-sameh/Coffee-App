import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Styles } from '../styles/ProductDetails';
import { images } from '../Content/resources';
import { CustomCarousel } from '../Components/CustomCarousel';
import { Rating } from 'react-native-ratings';
import { strSecondColor, widthScale } from '../styles/responsive';
import FastImage from 'react-native-fast-image';

export function ProductDetails() {

    return (
        <View style={Styles.wall}>
            <FastImage resizeMode='contain' style={Styles.wallCoffeeImage1} source={images.ProDetailsWallCoffee1} />
            <FastImage resizeMode='contain' style={Styles.wallCoffeeImage2} source={images.ProDetailsWallCoffee2} />
            <View style={Styles.headerContainer}>
                <TouchableWithoutFeedback>
                    <FastImage style={Styles.arrowBackIcon} resizeMode='contain' source={images.ArrowBack}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                <FastImage style={Styles.wishListButton} resizeMode='contain' source={images.WishListButton}/>
                </TouchableWithoutFeedback>
            </View>
            <View style={Styles.carouselContainer}>
                <CustomCarousel />
            </View>
            <View style={Styles.contentContainer}>
                <View style={Styles.NameAndPriceContainer}>
                    <Text style={Styles.txtTitles}>Ice Mocca</Text>
                    <Text style={Styles.txtProductPrice}>$5.4</Text>
                </View>
                <Rating
                    type='custom'
                    ratingBackgroundColor='#A19D9D'
                    ratingCount={5}
                    imageSize={widthScale(19)}
                    startingValue={1.5}
                    tintColor='#251919'
                    readonly={true}
                    style={Styles.rating}
                />
                <View style={Styles.ProductDesContainer}>
                    <Text style={Styles.txtTitles}>Product Details</Text>
                    <Text style={Styles.txtproductDes}>
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form, by injected humour
                    </Text>
                </View>
                <View style={Styles.productSizeContainer}>
                    <Text style={Styles.txtTitles}>Select Size</Text>
                    <View style={Styles.productSizeBtnContainer}>
                        <TouchableWithoutFeedback>
                            <View style={Styles.productSizeBtn}>
                                <Text style={Styles.txtProductSize}>S</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={Styles.productSizeBtn}>
                                <Text style={Styles.txtProductSize}>M</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={Styles.productSizeBtn}>
                                <Text style={Styles.txtProductSize}>L</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={Styles.productSizeBtn}>
                                <Text style={Styles.txtProductSize}>XL</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <View style={Styles.productCountContainer}>
                    <View style={Styles.txtProductCountTitle}>
                        <Text style={Styles.txtTitles}>Select Drink: </Text>
                        <Text style={Styles.txtProductNameCount}>Ice Mocca</Text>
                    </View>
                    <View style={Styles.productCountBtnContainer}>
                        <TouchableWithoutFeedback>
                            <Text style={Styles.txtProductCountBtn}>+</Text>
                        </TouchableWithoutFeedback>
                        <View style={Styles.productCount}>
                            <Text style={Styles.txtProductCount}>1</Text>
                        </View>
                        <TouchableWithoutFeedback>
                            <Text style={Styles.txtProductCountBtn}>-</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback>
                    <View style={Styles.addToCartButton}>
                        <Text style={Styles.txtAddToCart}>Add to cart</Text>
                        <FastImage style={Styles.cartIcon} resizeMode='contain' tintColor={strSecondColor} source={images.CartIcon}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}
