import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Home } from './src/screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image, View, Text } from 'react-native';
import { heightScale, moderateScale, strPrimaryColor, strSecondColor, widthScale } from './src/styles/responsive';
import HomeIcon from './src/assets/images/HomeIcon';
import CartIcon from './src/assets/images/CartIcon';
import ShoppingIcon from './src/assets/images/ShoppingIcon';
import WishListIcon from './src/assets/images/WishListIcon';
import ProfileIcon from './src/assets/images/ProfileIcon';
import { Shopping } from './src/screens/Shopping';
import { Header } from './src/Components/Header';
import ShoppingNavigator from './src/Navigation/ShoppingNavigator';

const Tab = createBottomTabNavigator();

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <NavigationContainer>
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
                  <HomeIcon color={focused ? "#C08F54": "#ffffff"}/>
                </View>
              )
            }
          }}
        />
        <Tab.Screen
          name="Cart"
          options={{
            headerShown:false,
            tabBarIcon: ({ focused }) => {
              return (
                <View style={Styles.screenContainer}>
                  <CartIcon color={focused ? strPrimaryColor: "#ffffff"}/>
                </View>
              )
            }
          }}
          children={() => <View style={{backgroundColor:'lightblue',flex:1}} />}
        />
        <Tab.Screen
          name="ShoppingNavigator"
          options={{
            headerShown:false,
            tabBarIcon: ({ focused }) => {
              return (
                <View style={Styles.screenContainer}>
                  <ShoppingIcon color={focused ? strPrimaryColor: "#ffffff"} categoryID={undefined}/>
                </View>
                
              )
            }
          }}
          children={() => <ShoppingNavigator searchQuery={searchQuery}  setSearchQuery={setSearchQuery}/>}
        />
        <Tab.Screen
          name="WishList"
          options={{
            headerShown:false,
            tabBarIcon: ({ focused }) => {
              return (
                <View style={Styles.screenContainer}>
                  <WishListIcon color={focused ? strPrimaryColor: "#ffffff"}/>
                </View>
              )
            }
          }}
          children={() => <View style={{backgroundColor:'lightblue',flex:1}} />}
        />
        <Tab.Screen
          name="Profile"
          options={{
            headerShown:false,
            tabBarIcon: ({ focused }) => {
              return (
                <View style={Styles.screenContainer}>
                  <ProfileIcon color={focused ? strPrimaryColor: "#ffffff"}/>
                </View>
              )
            }
          }}
          children={() => <View style={{backgroundColor:'lightblue',flex:1}} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

export const Styles = StyleSheet.create({
  tabBar: {
    height:heightScale(48),
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
  }
});
