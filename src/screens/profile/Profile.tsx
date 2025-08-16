import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Styles} from './ProfileStyles';
import FastImage from 'react-native-fast-image';
import {ArrowBack} from '../../Components/ArrowBack';
import {images} from '../../Content/resources';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {strSecondColor} from '../../styles/responsive';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {logOut} from '../../services/Authentication';

export default function Profile() {
  type typProfileOptions = {icon: string; label: string; screen?: string};
  const profileOptions: typProfileOptions[] = [
    {icon: 'phone-outline', label: 'Phone', screen: 'Phone'},
    {icon: 'map-marker-outline', label: 'Address', screen: 'Address'},
    {icon: 'lock-outline', label: 'Password', screen: 'ChangePassword'},
    {icon: 'power', label: 'Log out'},
  ];
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const {user} = useSelector((state: RootState) => state.user);

  function handleProfileOptionsPress(item: typProfileOptions): void {
    if (item.screen) {
      navigation.navigate('ProfileNavigator', {screen: item.screen});
    }
    if (item.label === 'Log out') {
      logOut();
      navigation.navigate('Login');
      return;
    }
  }

  return (
    <View style={Styles.mainContainer}>
      {/* Top Back Button */}
      <ArrowBack />

      {/* Background Decorations */}
      <FastImage
        style={Styles.wave}
        resizeMode="contain"
        source={images.WallWave}
      />
      <FastImage
        style={Styles.wallCoffeeImage1}
        resizeMode="contain"
        source={images.LoginWallIcon1}
      />
      <FastImage
        style={Styles.wallCoffeeImage2}
        resizeMode="contain"
        source={images.LoginWallIcon2}
      />

      <ScrollView contentContainerStyle={{paddingTop: 30, paddingBottom: 50}}>
        {/* Profile Picture */}
        <View style={Styles.profileContainer}>
          <FastImage
            style={Styles.profileImage}
            resizeMode="contain"
            source={images.User}
          />
          <TouchableOpacity style={Styles.editIcon}>
            <Icon name="camera-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={Styles.userName}>
            {user?.firstName! + user?.lastName}
          </Text>
        </View>

        {/* Options List */}
        <View style={{marginTop: 20}}>
          {profileOptions.map((item, index) => (
            <FastImage
              key={index}
              resizeMode="contain"
              style={Styles.frameContainer}
              source={images.FrameContainer}>
              <TouchableOpacity
                style={Styles.optionRow}
                onPress={() => handleProfileOptionsPress(item)}>
                <View style={Styles.iconContainer}>
                  <Icon name={item.icon} size={22} color={strSecondColor} />
                </View>
                <Text style={Styles.optionLabel}>{item.label}</Text>
                <Icon
                  name="chevron-right"
                  size={22}
                  color="#caa472"
                  style={{marginLeft: 'auto'}}
                />
              </TouchableOpacity>
            </FastImage>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
