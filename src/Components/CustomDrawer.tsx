/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import {
  heightScale,
  mdblBAR_HEIGHT,
  moderateScale,
  strINTER_MEDIUM500_Font,
  strINTER_SEMIBOLD600_Font,
  strPrimaryColor,
  strSecondColor,
  strWhiteColor,
  widthScale,
} from '../styles/responsive';
import {images} from '../Content/resources';
import {logOut, getUserName} from '../services/Authentication';

const drawerItems = [
  {
    label: 'Home',
    icon: images.HomeIcon,
    parent: 'TapNavigator',
    screen: 'Home',
  },
  {
    label: 'Profile',
    icon: images.ProfileIcon,
    parent: 'ProfileNavigator',
    screen: 'Profile',
  },
  {
    label: 'Favourite',
    icon: images.FavouriteListIcon,
    parent: 'TapNavigator',
    screen: 'Favourite',
  },
  {
    label: 'Orders',
    icon: images.FavouriteListIcon,
    parent: 'DrawerNavigator',
    screen: 'Orders',
  },
  {label: 'Log out', icon: images.LogOutIcon, action: 'logout'},
];

const CustomDrawer = (props: any) => {
  const {state, navigation} = props;
  // const navigation: NavigationProp<ParamListBase> = useNavigation();

  const DrawerItem = ({item, isFocused}: any) => {
    const onPress = () => {
      if (item.action === 'logout') {
        logOut();
        navigation.navigate('Login');
        return;
      }

      if (item.parent) {
        navigation.navigate(item.parent, {
          screen: item.screen,
        });
      }
    };

    return (
      <Pressable
        onPress={onPress}
        style={[Styles.btnContainer, isFocused && Styles.activeBtnContainer]}>
        <View style={Styles.iconContainer}>
          <FastImage
            style={Styles.icon}
            resizeMode="contain"
            tintColor={strPrimaryColor}
            source={item.icon}
          />
        </View>
        <Text
          style={[
            Styles.txtbtn,
            isFocused ? {color: strWhiteColor} : {color: strSecondColor},
          ]}>
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={Styles.mainContainer}>
      {/* Header */}
      <View style={Styles.header}>
        <FastImage
          style={Styles.userImage}
          resizeMode="contain"
          source={images.User}
        />
        <View>
          <Text style={Styles.txtUserName}>{getUserName()}</Text>
          <Text style={Styles.txtUserType}>Customer</Text>
        </View>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView {...props}>
        <View>
          {drawerItems.map((item, index) => (
            <DrawerItem
              key={index}
              item={item}
              isFocused={state.index === index}
            />
          ))}
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

export const Styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    marginTop: mdblBAR_HEIGHT,
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
    marginBottom: moderateScale(20),
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: strSecondColor,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: strSecondColor,
    alignItems: 'center',
    justifyContent: 'center',
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
    textTransform: 'capitalize',
  },
  txtUserType: {
    fontFamily: strINTER_MEDIUM500_Font,
    fontSize: moderateScale(13),
    color: strWhiteColor,
    paddingLeft: moderateScale(10),
  },
  btnContainer: {
    width: widthScale(191),
    height: heightScale(44),
    flexDirection: 'row',
    paddingLeft: moderateScale(16),
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  activeBtnContainer: {
    width: widthScale(191),
    height: heightScale(44),
    flexDirection: 'row',
    backgroundColor: strSecondColor,
    borderTopRightRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  txtbtn: {
    fontFamily: strINTER_MEDIUM500_Font,
    fontSize: moderateScale(16),
    paddingLeft: moderateScale(10),
  },
});
