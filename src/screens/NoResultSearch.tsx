import React from 'react';
import {Text, TouchableWithoutFeedback, View } from 'react-native';
import { Styles } from '../styles/NoResultSearch';
import FastImage from 'react-native-fast-image';
import { images } from '../Content/resources';

export function NoResultSearch() {
    return (
        <View style={Styles.wall}>
            <View style={Styles.backArrowContainer}>
                <TouchableWithoutFeedback>
                <FastImage style={Styles.arrowBackIcon} resizeMode='contain' source={images.ArrowBack}/>
                </TouchableWithoutFeedback>
            </View>
            <View style={Styles.contantContainer}>
                <View style={Styles.srchIconContainer}>
                <FastImage style={Styles.noResultSearchIcon} resizeMode='contain' source={images.NoResultSearchIcon}/>
                </View>
                <Text style={Styles.txtTitle}>Sad no result</Text>
                <Text style={Styles.txtParagraph}>We can’t find the item you are searching
                    for. maybe a little spelling mistake? </Text>
            </View>
        </View>
    );
}