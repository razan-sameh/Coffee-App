import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { images } from '../Content/resources';
import FastImage from 'react-native-fast-image';
import { widthScale, heightScale } from '../styles/responsive';

const Splash = ({ navigation }: any) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Onboarding');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={Styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <ImageBackground source={images.SplashWall} resizeMode="cover" style={Styles.image}>
                <FastImage resizeMode='contain' style={Styles.splashWallIcon1} source={images.SplashWallIcon1} />
                <FastImage resizeMode='contain' style={Styles.splashWallIcon2} source={images.SplashWallIcon2} />
                <FastImage resizeMode='contain' style={Styles.logo} source={images.Logo} />
            </ImageBackground>
        </View>
    );
}
export default Splash;

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    splashWallIcon1: {
        position: 'absolute',
        top: '30%',
        right: 0,
        width: widthScale(60),
        height: heightScale(60),
    },
    splashWallIcon2: {
        position: 'absolute',
        top: '70%',
        left: -5,
        width: widthScale(60),
        height: heightScale(60),
    },
    logo: {
        position: 'absolute',
        top: '5%',
        alignSelf: 'center',
        width: widthScale(207),
        height: heightScale(171),
    },
});