import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Styles } from '../styles/NoResultSearch';
import { images } from '../Content/resources';


export function NoResultSearch() {
    return (
        <View style={Styles.wall}>
            <View style={Styles.backArrowContainer}>
                <TouchableWithoutFeedback>
                    <Image source={images.arrowBack} />
                </TouchableWithoutFeedback>
            </View>
            <View>
                <NoResultSearch />
                <Text>Sad no result</Text>
                <Text>We can’t find the item you are searching
                    for. maybe a little spelling mistake? </Text>
            </View>
        </View>
    );
}