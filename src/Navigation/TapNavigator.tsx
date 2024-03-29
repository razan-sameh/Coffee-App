import React, { useState } from 'react';
import { Shopping } from '../screens/Shopping';
import { createStackNavigator } from '@react-navigation/stack';
import { NoResultSearch } from '../screens/NoResultSearch';
import { Header } from '../Components/Header';
import { Filter } from '../screens/Filter';
import { ProductDetails } from '../screens/ProductDetails';
import { createNavigationContainerRef, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../Content/resources';
import { Home } from '../screens/Home';
import ShoppingNavigator from './ShoppingNavigator';
import { heightScale, moderateScale, strSecondColor, widthScale } from '../styles/responsive';

const Tab = createBottomTabNavigator();

const TapNavigator = ({ navigation, routeName }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const blnIsTabBarHide = routeName == "ProductDetails"


    return (
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
                    tabBarStyle: [Styles.tabBar, { display: blnIsTabBarHide ? "none" : "flex" }]
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
