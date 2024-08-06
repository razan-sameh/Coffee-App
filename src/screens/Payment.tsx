import React from 'react';
import { Text, View } from 'react-native';
import { Styles } from '../styles/Payment';
import { ArrowBack } from '../Components/ArrowBack';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { images } from '../Content/resources';

export function Payment() {
    const navigation : NavigationProp<ParamListBase>= useNavigation();

    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.backArrowContainer}>
                <ArrowBack />
                <Text style={Styles.txtTitle}>Payment</Text>
            </View>
            <FastImage style={Styles.wave} resizeMode='contain' source={images.WallWave} />
            <FastImage style={Styles.wallCoffeeImage1} resizeMode='contain' source={images.LoginWallIcon1} />
            <FastImage style={Styles.wallCoffeeImage2} resizeMode='contain' source={images.LoginWallIcon2} />
        </View>
    );
}
