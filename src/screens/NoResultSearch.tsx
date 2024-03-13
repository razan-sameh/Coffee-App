import React from 'react';
import {Text, TouchableWithoutFeedback, View } from 'react-native';
import NoResultSearchIcon from '../assets/images/NoResultSearchIcon';
import { Styles } from '../styles/NoResultSearch';
import ArrowBack from '../assets/images/ArrowBack';

export function NoResultSearch() {
    return (
        <View style={Styles.wall}>
            <View style={Styles.backArrowContainer}>
                <TouchableWithoutFeedback>
                    <ArrowBack />
                </TouchableWithoutFeedback>
            </View>
            <View style={Styles.contantContainer}>
                <View style={Styles.srchIconContainer}>
                    <NoResultSearchIcon />
                </View>
                <Text style={Styles.txtTitle}>Sad no result</Text>
                <Text style={Styles.txtParagraph}>We can’t find the item you are searching
                    for. maybe a little spelling mistake? </Text>
            </View>
        </View>
    );
}