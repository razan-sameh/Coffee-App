import {
    View,
    Text,
    Pressable,
} from "react-native";
import {
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useState } from "react";
import FastImage from "react-native-fast-image";
import { StyleSheet } from "react-native";
import { heightScale, moderateScale, strINTER_MEDIUM500_Font, strINTER_SEMIBOLD600_Font, strPrimaryColor, strSecondColor, strWhiteColor, widthScale } from "../styles/responsive";
import { images } from "../Content/resources";
import { getUserName, logOut } from "../Content/Authentication";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const CustomDrawer = (props: any) => {
    const { state, navigation  } = props;
    const DrawerItem = ({ route, label, Icon  ,isFocused }: any) => {

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
            });
            if (!event.defaultPrevented) {
                if (route.name === 'LogOut') {
                //     navigation.navigate('MainNavigator', {
                //         screen: 'Main',
                //         params: {screen:'Other'}
                //     });
                    logOut()
                    navigation.navigate('Login')
                }
                else {
                navigation.navigate(route.name, route.params);
                }
            }
        };

        return (
            <Pressable
                onPress={onPress}
                style={[
                    Styles.btnContainer,
                    isFocused  && Styles.activeBtnContainer,
                ]}>
                <View style={Styles.iconContainer}>
                    <FastImage style={Styles.icon} resizeMode='contain' tintColor={strPrimaryColor} source={Icon} />
                </View>
                <Text style={[Styles.txtbtn,isFocused  ? {color: strWhiteColor} : {color: strSecondColor}]}>
                    {label}
                </Text>
            </Pressable>
        )
    }
    return (
        <View style={Styles.mainContainer}>
            <View style={Styles.header}>
                <FastImage style={Styles.userImage} resizeMode='contain' source={images.User} />
                <View>
                    <Text style={Styles.txtUserName}>{getUserName()}</Text>
                    <Text style={Styles.txtUserType}>Customer</Text>
                </View>
            </View>
            <DrawerContentScrollView
                {...props}
            >
                <View>
                    <DrawerItem
                        isFocused={state.index === 0}
                        route={state.routes[0]}
                        label={'Home'}
                        Icon={images.HomeIcon}
                    />
                    <DrawerItem
                        isFocused={state.index === 1}
                        route={state.routes[1]}
                        label={'Profile'}
                        Icon={images.ProfileIcon}
                    />
                    <DrawerItem
                        isFocused={state.index === 2}
                        route={state.routes[2]}
                        label={'Favourite'}
                        Icon={images.FavouriteListIcon}
                    />
                    <DrawerItem
                        isFocused={state.index === 3}
                        route={state.routes[3]}
                        label={'Setting'}
                        Icon={images.SettingIcon}
                    />
                    <DrawerItem
                        isFocused={state.index === 4}
                        route={state.routes[4]}
                        label={'Help'}
                        Icon={images.HelpIcon}
                    />
                    <DrawerItem
                        isFocused={state.index === 4}
                        route={state.routes[5]}
                        label={'Log out'}
                        Icon={images.LogOutIcon}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomDrawer;
export const Styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        backgroundColor: strPrimaryColor,
        borderTopRightRadius: moderateScale(30),
    },
    header: {
        width: '60%',
        height: heightScale(100),
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: moderateScale(15),
        borderBottomWidth: 2,
        borderBottomColor: strSecondColor,
        marginBottom:moderateScale(20)
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: strSecondColor
    },
    iconContainer:{
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: strSecondColor,
        alignItems:'center',
        justifyContent:'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    txtUserName: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(16),
        color: strSecondColor,
        paddingLeft: moderateScale(10),
        textTransform:'capitalize'
    },
    txtUserType: {
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(13),
        color: strWhiteColor,
        paddingLeft: moderateScale(10)
    },
    btnContainer: {
        width: widthScale(191),
        height: heightScale(44),
        flexDirection: 'row',
        paddingLeft: moderateScale(16),
        alignItems: 'center',
        marginBottom:moderateScale(20)
    },
    activeBtnContainer: {
        width: widthScale(191),
        height: heightScale(44),
        flexDirection: 'row',
        backgroundColor: strSecondColor,
        borderTopRightRadius: moderateScale(30),
        borderBottomRightRadius: moderateScale(30),
        alignItems: 'center',
        marginBottom:moderateScale(20)
    },
    txtbtn: {
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(16),
        paddingLeft: moderateScale(10),
    },
});