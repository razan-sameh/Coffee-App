import React, {useEffect, useState} from 'react';
import {View, ImageBackground, StyleSheet, StatusBar} from 'react-native';
import {images} from '../Content/resources';
import FastImage from 'react-native-fast-image';
import {widthScale, heightScale} from '../styles/responsive';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const Splash = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [blnIsFirstLaunch, setFirstLaunch] = useState<boolean>();
  const checkFirstLaunch = async () => {
    const strFirstLanuch = await AsyncStorage.getItem('FIRST_LAUNCH');
    if (!strFirstLanuch) {
      AsyncStorage.setItem('FIRST_LAUNCH', 'Done');
      setFirstLaunch(true);
    } else {
      setFirstLaunch(false);
    }
  };
  useEffect(() => {
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (blnIsFirstLaunch === true) {
        navigation.navigate('Onboarding');
      } else {
        auth().onAuthStateChanged(user => {
          console.log('user', user);
          if (user != null) {
            navigation.navigate('DrawerNavigator', {screen: 'TapNavigator'});
          } else {
            navigation.navigate('Login');
          }
        });
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation, blnIsFirstLaunch]);

  return (
    <View style={Styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ImageBackground
        source={images.SplashWall}
        resizeMode="cover"
        style={Styles.image}>
        <FastImage
          resizeMode="contain"
          style={Styles.wallCoffeeImage1}
          source={images.SplashWallIcon1}
        />
        <FastImage
          resizeMode="contain"
          style={Styles.wallCoffeeImage2}
          source={images.SplashWallIcon2}
        />
        <FastImage
          resizeMode="contain"
          style={Styles.logo}
          source={images.Logo}
        />
      </ImageBackground>
    </View>
  );
};
export default Splash;

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  wallCoffeeImage1: {
    position: 'absolute',
    top: '30%',
    right: 0,
    width: widthScale(60),
    height: heightScale(60),
  },
  wallCoffeeImage2: {
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
