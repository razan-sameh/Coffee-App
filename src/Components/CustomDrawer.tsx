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
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getActiveRouteName} from '../Content/Utils';

const drawerItems = [
  {label: 'Home', icon: 'home-outline', parent: 'TapNavigator', screen: 'Home'},
  {
    label: 'Profile',
    icon: 'account',
    parent: 'ProfileNavigator',
    screen: 'Profile',
  },
  {
    label: 'Change Password',
    icon: 'lock-reset',
    parent: 'DrawerNavigator',
    screen: 'ChangePassword',
  },
  {
    label: 'Favourite',
    icon: 'heart',
    parent: 'TapNavigator',
    screen: 'Favourite',
  },
  {
    label: 'My Order',
    icon: 'cart-check',
    parent: 'TapNavigator',
    screen: 'MyOrder',
  },
  {label: 'Log out', icon: 'logout', action: 'logout'},
];

const CustomDrawer = (props: any) => {
  const {state, navigation} = props;
  const {user} = useSelector((state: RootState) => state.user);
  const currentRouteName = getActiveRouteName(state);

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
          <Icon
            name={item.icon}
            size={20}
            color={isFocused ? strWhiteColor : strPrimaryColor}
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
          resizeMode="cover" // or contain, depending on style
          source={
            user?.profilePicture
              ? {uri: user.profilePicture} // wrap string in { uri }
              : images.User // fallback local image
          }
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
              isFocused={item.screen === currentRouteName}
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
