import React, {useEffect} from 'react';
import {TouchableOpacity, Text, BackHandler} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  CommonActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Styles} from '../OrderConfirmationStyle';
import {images} from '../../../Content/resources';

export const OrderConfirmationButtons = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home'); // Go to Home screen
      return true; // prevent default behavior
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <TouchableOpacity
      style={Styles.btnOutline}
      onPress={() => {
        navigation.navigate('TapNavigator', {screen: 'Home'});
        // Reset CartNavigator so it starts fresh
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'CartNavigator',
                state: {
                  routes: [{name: 'Cart'}],
                },
              },
            ],
          }),
        );
      }}>
      <FastImage
        source={images.HomeIcon}
        style={{width: 20, height: 20, marginRight: 8}}
        resizeMode="contain"
      />
      <Text style={Styles.btnOutlineText}>Back to Home</Text>
    </TouchableOpacity>
  );
};
