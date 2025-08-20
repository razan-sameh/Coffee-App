import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useReducer} from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {Styles} from './EditProfileStyle';
import FastImage from 'react-native-fast-image';
import {ArrowBack} from '../../Components/ArrowBack';
import {images} from '../../Content/resources';
import styles from 'rn-range-slider/styles';
import {strWhiteColor} from '../../styles/responsive';
import {useLocation} from '../../provider/LocationProvider';
import {formatLocation} from '../../Content/Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {updateUserProfileAsync} from '../../redux/slices/userSlice';
import {profileReducer} from './profileReducer';

export default function EditProfile() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useSelector((state: RootState) => state.user);
  const {setLocation, location, isPicked, setIsPicked} = useLocation();
  const dispatch = useAppDispatch();

  // reducer state
  const [state, dispatchLocal] = useReducer(profileReducer, {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phones: user?.phoneNumber ?? [],
    addresses: user?.address ?? [],
  });
  useEffect(() => {
    if (location && isPicked) {
      dispatchLocal({type: 'ADD_ADDRESS', payload: location});
      setIsPicked(false); // reset
    }
  }, [location, isPicked, setIsPicked]);

  // save handler
  const handleSave = () => {
    if (!user?.Uid) {
      return;
    }

    const updates: any = {};

    if (state.firstName !== user.firstName) {
      updates.firstName = state.firstName;
    }
    if (state.lastName !== user.lastName) {
      updates.lastName = state.lastName;
    }
    if (
      JSON.stringify(state.phones) !== JSON.stringify(user.phoneNumber ?? [])
    ) {
      updates.phoneNumber = state.phones;
    }
    if (
      JSON.stringify(state.addresses) !== JSON.stringify(user.address ?? [])
    ) {
      updates.address = state.addresses;
    }

    if (Object.keys(updates).length > 0) {
      dispatch(updateUserProfileAsync({Uid: user.Uid, ...updates}));
    } else {
      console.log('⚠️ Nothing changed');
    }
  };

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

      <ScrollView style={{flex: 1}}>
        <View style={Styles.profileContainer}>
          <FastImage
            style={Styles.profileImage}
            resizeMode="contain"
            source={images.User}
          />
          <TouchableOpacity style={Styles.editIcon}>
            <Icon name="camera-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* First Name */}
        <Text style={Styles.sectionTitle}>First Name</Text>
        <TextInput
          style={Styles.input}
          value={state.firstName}
          onChangeText={txt =>
            dispatchLocal({type: 'SET_FIRST_NAME', payload: txt})
          }
        />

        {/* Last Name */}
        <Text style={Styles.sectionTitle}>Last Name</Text>
        <TextInput
          style={Styles.input}
          value={state.lastName}
          onChangeText={txt =>
            dispatchLocal({type: 'SET_LAST_NAME', payload: txt})
          }
        />

        {/* Phones */}
        <View style={styles.textInputContainer}>
          <Text style={Styles.sectionTitle}>Phones</Text>
          <TouchableOpacity onPress={() => dispatchLocal({type: 'ADD_PHONE'})}>
            <Text style={Styles.addText}>+ Add Phone</Text>
          </TouchableOpacity>
        </View>
        {state.phones.map((p, i) => (
          <TextInput
            key={i}
            style={Styles.input}
            value={p}
            onChangeText={txt =>
              dispatchLocal({type: 'UPDATE_PHONE', index: i, payload: txt})
            }
          />
        ))}

        {/* Addresses */}
        <View style={styles.textInputContainer}>
          <Text style={Styles.sectionTitle}>Addresses</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LocationPicker')}>
            <Text style={Styles.addText}>+ Add Address</Text>
          </TouchableOpacity>
        </View>
        {state.addresses.map((a, i) => {
          const formatted = formatLocation(a);
          return (
            <TouchableOpacity
              key={i}
              style={Styles.input}
              onPress={() => {
                const loc =
                  a?.latitude && a?.longitude
                    ? {latitude: a.latitude, longitude: a.longitude}
                    : null;

                if (loc) {
                  setLocation(loc); // set globally
                }

                navigation.navigate('LocationPicker', {
                  initialLocation: loc, // Pass directly in params
                });
              }}>
              <Text style={{color: strWhiteColor}}>{formatted}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Save button */}
        <TouchableOpacity style={Styles.saveBtn} onPress={handleSave}>
          <Text style={Styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
