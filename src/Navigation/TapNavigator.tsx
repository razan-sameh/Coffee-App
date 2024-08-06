import React, { useState } from 'react';
import { Header } from '../Components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../Content/resources';
import { Home } from '../screens/Home';
import ShoppingNavigator from './ShoppingNavigator';
import { heightScale, moderateScale, strSecondColor, widthScale } from '../styles/responsive';
import { Favourite } from '../screens/Favourite';
import { Cart } from '../screens/Cart';
import CartNavigator from './CartNavigator';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TapNavigator = ({  routeName }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const blnIsTabBarHide = routeName == "ProductDetails" || routeName == "Filter" 
    const navigation: NavigationProp<ParamListBase>= useNavigation();


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
                children={() => <Home/>}
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
                name="CartNavigator"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={Styles.screenContainer}>
                                <FastImage style={Styles.tabBarIcons} resizeMode='contain' tintColor={focused ? "#C08F54" : "#ffffff"} source={images.CartIcon} />
                            </View>
                        )
                    },
                    tabBarStyle: { display: "none"}
                }}
                children={() => <CartNavigator />}
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
                listeners={{
                    tabPress: () => {
                        navigation.navigate('ShoppingNavigator', {
                            screen: 'Shopping',
                            params: { categoryID: undefined }
                        });
                    }
                }}
                children={(navigation) => <ShoppingNavigator searchQuery={searchQuery} setSearchQuery={setSearchQuery} navigation={navigation} />}
            />
            <Tab.Screen
                name="Favourite"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={Styles.screenContainer}>
                                <FastImage style={Styles.tabBarIcons} resizeMode='contain' tintColor={focused ? "#C08F54" : "#ffffff"} source={images.FavouriteListIcon} />
                            </View>
                        )
                    }
                }}
                listeners={{
                    tabPress: () => {
                        navigation.navigate('ShoppingNavigator', {
                            screen: 'Favourite',
                            params: { categoryID: undefined }
                        });
                    }
                }}
                children={() => <Favourite />}
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
