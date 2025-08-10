import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
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
  const navigationTo: NavigationProp<ParamListBase> = useNavigation();

  return (
    <TouchableOpacity
      style={Styles.btnOutline}
      onPress={() => {
        navigationTo.navigate('TapNavigator', {screen: 'Home'});
        // Reset CartNavigator so it starts fresh
        navigationTo.dispatch(
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
