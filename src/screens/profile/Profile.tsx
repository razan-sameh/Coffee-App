import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Styles} from './ProfileStyles';
import FastImage from 'react-native-fast-image';
import {ArrowBack} from '../../Components/ArrowBack';
import {images} from '../../Content/resources';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {formatLocation} from '../../Content/Utils';

export default function Profile() {
  const {user} = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<any>();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={Styles.mainContainer}>
      {/* Back Button */}
      <ArrowBack />

      {/* Background */}
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
          <Text style={Styles.userName}>
            {user?.firstName}
            {user?.lastName}
          </Text>
        </View>

        {/* Basic Info */}
        <View style={Styles.infoCard}>
          <View style={Styles.infoRow}>
            <Icon name="email-outline" size={20} color="#fff" />
            <Text style={Styles.infoLabel}>Email:</Text>
            <Text style={Styles.infoValue}>{user?.email}</Text>
          </View>

          <View style={Styles.infoRow}>
            <Icon name="lock-outline" size={20} color="#fff" />
            <Text style={Styles.infoLabel}>Password:</Text>
            <Text style={Styles.infoValue}>
              {showPassword ? user?.password : '••••••••'}
            </Text>

            {/* Toggle Show/Hide */}
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{marginLeft: 8}}>
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Phones */}
        <View style={Styles.infoCard}>
          <Text style={Styles.sectionTitle}>Phone Numbers</Text>
          {user?.phoneNumber?.length ? (
            user.phoneNumber.map((p, i) => (
              <View key={i} style={Styles.listRow}>
                <Icon name="phone" size={18} color="#fff" />
                <Text style={Styles.listText}>{p}</Text>
              </View>
            ))
          ) : (
            <Text style={Styles.emptyText}>No phone numbers added</Text>
          )}
        </View>

        {/* Addresses */}
        <View style={Styles.infoCard}>
          <Text style={Styles.sectionTitle}>Addresses</Text>
          {user?.address?.length ? (
            user.address.map((a, i) => (
              <View key={i} style={Styles.listRow}>
                <Icon name="home" size={18} color="#fff" />
                <Text style={Styles.listText}>{formatLocation(a)}</Text>
              </View>
            ))
          ) : (
            <Text style={Styles.emptyText}>No addresses added</Text>
          )}
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={Styles.editProfileBtn}
          onPress={() =>
            navigation.navigate('ProfileNavigator', {
              screen: 'EditProfile',
            })
          }>
          <Icon name="pencil" size={18} color="#fff" />
          <Text style={Styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
