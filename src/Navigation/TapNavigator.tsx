/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Header} from '../Components/header/Header';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../Content/resources';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ShoppingNavigator from './ShoppingNavigator';
import {
  heightScale,
  moderateScale,
  strPrimaryColor,
  strSecondColor,
  strWhiteColor,
  widthScale,
} from '../styles/responsive';
import {Favourite} from '../screens/favourite/Favourite';
import CartNavigator from './CartNavigator';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Home} from '../screens/home/Home';
import {useSelector} from 'react-redux';
import Orders from '../screens/orders/Orders';

const Tab = createBottomTabNavigator();

const TapNavigator = ({routeName}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const blnIsTabBarHide =
    routeName == 'ProductDetails' || routeName == 'Filter';
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: Styles.tabBar,
        header: navigation => (
          <Header
            {...navigation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ),
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        children={() => <Home />}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home" // choose appropriate icon name
              size={moderateScale(24)}
              color={focused ? '#C08F54' : '#ffffff'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CartNavigator"
        options={{
          headerShown: false,
          tabBarBadge:
            useSelector((state: any) =>
              state.cart.items.reduce(
                (total: number, item: any) => total + item.count,
                0,
              ),
            ) || undefined,
          tabBarBadgeStyle: {
            backgroundColor: strPrimaryColor,
            color: strWhiteColor,
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="cart-plus"
              size={moderateScale(24)}
              color={focused ? '#C08F54' : '#ffffff'}
            />
          ),
          tabBarStyle: {display: 'none'},
        }}
        children={() => <CartNavigator />}
      />

      <Tab.Screen
        name="ShoppingNavigator"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={Styles.screenContainer}>
                <View
                  style={[
                    Styles.shoppingIconContainer,
                    focused
                      ? {backgroundColor: '#C08F54'}
                      : {backgroundColor: '#ffffff'},
                  ]}>
                  <FastImage
                    style={Styles.shoppingIcon}
                    resizeMode="contain"
                    source={images.ShoppingIcon}
                  />
                </View>
              </View>
            );
          },
          tabBarStyle: [
            Styles.tabBar,
            {display: blnIsTabBarHide ? 'none' : 'flex'},
          ],
        }}
        listeners={{
          tabPress: () => {
            navigation.navigate('ShoppingNavigator', {
              screen: 'Shopping',
              params: {categoryID: undefined},
            });
          },
        }}
        children={navigation => (
          <ShoppingNavigator
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            navigation={navigation}
          />
        )}
      />

      <Tab.Screen
        name="Favourite"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="heart"
              size={moderateScale(24)}
              color={focused ? '#C08F54' : '#ffffff'}
            />
          ),
        }}
        children={() => <Favourite />}
      />

      <Tab.Screen
        name="Orders"
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="cart-check"
              size={moderateScale(24)}
              color={focused ? '#C08F54' : '#ffffff'}
            />
          ),
          tabBarStyle: {display: 'none'},
        }}
        children={() => <Orders />}
      />
    </Tab.Navigator>
  );
};

export default TapNavigator;
export const Styles = StyleSheet.create({
  tabBar: {
    height: heightScale(48),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    position: 'absolute',
    bottom: 0,
    backgroundColor: strSecondColor,
    borderColor: strSecondColor,
    elevation: 3,
    shadowColor: strPrimaryColor,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoppingIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoppingIcon: {
    width: widthScale(40),
    height: heightScale(34),
  },
  tabBarIcons: {
    width: widthScale(20),
    height: heightScale(20),
  },
});
