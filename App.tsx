import {  createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Home } from './src/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image, View, Text } from 'react-native';
import { heightScale, moderateScale, strSecondColor, widthScale } from './src/styles/responsive';
import { Header } from './src/Components/Header';
import ShoppingNavigator from './src/Navigation/ShoppingNavigator';
import FastImage from 'react-native-fast-image';
import { images } from './src/Content/resources';

const Tab = createBottomTabNavigator();
const ref : any = createNavigationContainerRef();

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [routeName, setRouteName] = useState<string>('');
  const blnIsTabBarHide = routeName == "ProductDetails"

  return (
    <NavigationContainer
    ref={ref}
    onReady={() => {
      setRouteName(ref.getCurrentRoute().name)
    }}
    onStateChange={async () => {
      const previousRouteName = routeName;
      const currentRouteName = ref.getCurrentRoute().name;
      setRouteName(currentRouteName);
    }}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: Styles.tabBar,
          header: (navigation) => <Header {...navigation} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        }}
        initialRouteName='Home'
      >
        <Tab.Screen
          name="Home"
          children={(props) => <Home {...props} />}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={Styles.screenContainer}>
                  <FastImage style={Styles.tabBarIcons} resizeMode='contain' tintColor={focused ? "#C08F54" : "#ffffff"} source={images.HomeIcon} />
                </View>
              )
            },
          }}

        />
        <Tab.Screen
          name="Cart"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <View style={Styles.screenContainer}>
                  <FastImage style={Styles.tabBarIcons} resizeMode='contain' tintColor={focused ? "#C08F54" : "#ffffff"} source={images.CartIcon} />
                </View>
              )
            }
          }}
          children={() => <View style={{ backgroundColor: 'lightblue', flex: 1 }} />}
        />
        <Tab.Screen
          name="ShoppingNavigator"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <View style={Styles.screenContainer}>
                  <View style={[Styles.shoppingIconContainer, focused ? { backgroundColor: "#C08F54" } : { backgroundColor: "#ffffff" }]}>
                    <FastImage style={Styles.shoppingIcon} resizeMode='contain' source={images.ShoppingIcon} />
                  </View>
                </View>
              )
            },
            tabBarStyle: [Styles.tabBar,{display:  blnIsTabBarHide ? "none" : "flex"}]
          }}
          children={(navigation) => <ShoppingNavigator searchQuery={searchQuery} setSearchQuery={setSearchQuery} navigation={navigation} />}
        />
        <Tab.Screen
          name="WishList"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <View style={Styles.screenContainer}>
                  <FastImage style={Styles.tabBarIcons} resizeMode='contain' tintColor={focused ? "#C08F54" : "#ffffff"} source={images.WishListIcon} />
                </View>
              )
            }
          }}
          children={() => <View style={{ backgroundColor: 'lightblue', flex: 1 }} />}
        />
        <Tab.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <View style={Styles.screenContainer}>
                  <FastImage style={Styles.tabBarIcons} resizeMode='contain' tintColor={focused ? "#C08F54" : "#ffffff"} source={images.ProfileIcon} />
                </View>
              )
            }
          }}
          children={() => <View style={{ backgroundColor: 'lightblue', flex: 1 }} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

export const Styles = StyleSheet.create({
  tabBar: {
    height: heightScale(48),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    position: 'absolute',
    bottom: 0,
    backgroundColor: strSecondColor,
    borderColor: strSecondColor,
  },
  screenContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  shoppingIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  shoppingIcon: {
    width: widthScale(40),
    height: heightScale(34)
  },
  tabBarIcons: {
    width: widthScale(20),
    height: heightScale(20)
  }
});
