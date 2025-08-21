import {Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
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
import {strPrimaryColor, strWhiteColor} from '../../styles/responsive';
import {useLocation} from '../../provider/LocationProvider';
import {formatLocation} from '../../Content/Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {updateUserProfileAsync} from '../../redux/slices/userSlice';
import {Controller, useForm, useFieldArray} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type FormValues = {
  firstName: string;
  lastName: string;
  phones: {value: string}[];
  addresses: any[];
};

export default function EditProfile() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useSelector((state: RootState) => state.user);
  const {setLocation, location, isPicked, setIsPicked} = useLocation();
  const dispatch = useAppDispatch();

  // hook form
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phones: (user?.phoneNumber ?? []).map(p => ({value: p})),
      addresses: user?.address ?? [],
    },
  });

  const {
    fields: phoneFields,
    append: addPhone,
    remove: removePhone,
  } = useFieldArray<FormValues>({
    control,
    name: 'phones',
  });

  const {
    fields: addressFields,
    append: addAddress,
    remove: removeAddress,
  } = useFieldArray({
    control,
    name: 'addresses',
  });

  // Add location picked from LocationPicker
  useEffect(() => {
    if (location && isPicked) {
      addAddress(location);
      setIsPicked(false);
    }
  }, [location, isPicked, addAddress, setIsPicked]);

  const onSubmit = (data: FormValues) => {
    if (!user?.Uid) {
      return;
    }

    const updates: any = {};

    if (data.firstName !== user.firstName) {
      updates.firstName = data.firstName;
    }
    if (data.lastName !== user.lastName) {
      updates.lastName = data.lastName;
    }

    if (JSON.stringify(data.phones) !== JSON.stringify(user.phoneNumber)) {
      updates.phoneNumber = data.phones;
    }
    if (JSON.stringify(data.addresses) !== JSON.stringify(user.address)) {
      updates.address = data.addresses;
    }

    if (Object.keys(updates).length > 0) {
      dispatch(updateUserProfileAsync({Uid: user.Uid, ...updates}));
    } else {
      console.log('⚠️ Nothing changed');
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView>
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

        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
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
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={[Styles.input]}
                value={value}
                onChangeText={onChange}
                underlineStyle={{display: 'none'}}
                contentStyle={{color: strWhiteColor}}
              />
            )}
          />
          {errors.firstName && (
            <Text style={Styles.txtError}>This is required.</Text>
          )}

          {/* Last Name */}
          <Text style={Styles.sectionTitle}>Last Name</Text>
          <Controller
            control={control}
            name="lastName"
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={[Styles.input]}
                value={value}
                onChangeText={onChange}
                underlineStyle={{display: 'none'}}
                contentStyle={{color: strWhiteColor}}
              />
            )}
          />
          {errors.lastName && (
            <Text style={Styles.txtError}>This is required.</Text>
          )}

          {/* Phones */}
          <View style={Styles.contantContainer}>
            <Text style={Styles.sectionTitle}>Phones</Text>
            <TouchableOpacity onPress={() => addPhone('')}>
              <Text style={Styles.addText}>+ Add Phone</Text>
            </TouchableOpacity>
          </View>
          {phoneFields.map((field, i) => (
            <View key={field.id} style={Styles.contantContainer}>
              <Controller
                control={control}
                name={`phones.${i}.value`}
                rules={{
                  pattern:
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    style={[Styles.input]}
                    value={value}
                    onChangeText={onChange}
                    underlineStyle={{display: 'none'}}
                    contentStyle={{color: strWhiteColor}}
                  />
                )}
              />
              <TouchableOpacity
                onPress={() => removePhone(i)}
                style={{marginLeft: 8}}>
                <Icon name="delete" size={22} color={strPrimaryColor} />
              </TouchableOpacity>
            </View>
          ))}
          {errors.phones && errors.phones.type === 'pattern' && (
            <Text style={Styles.txtError}>
              The password must contain digit, lowercase letter, uppercase
              letter, special character, no space, and it must be 8-16
              characters long.
            </Text>
          )}
          {errors.phones && errors.phones.type === 'required' && (
            <Text style={Styles.txtError}>This is required.</Text>
          )}

          {/* Addresses */}
          <View style={Styles.contantContainer}>
            <Text style={Styles.sectionTitle}>Addresses</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LocationPicker')}>
              <Text style={Styles.addText}>+ Add Address</Text>
            </TouchableOpacity>
          </View>
          {addressFields.map((field, i) => {
            const formatted = formatLocation(field);
            return (
              <View key={field.id} style={Styles.contantContainer}>
                <TouchableOpacity
                  style={[Styles.inputAddress]}
                  onPress={() => {
                    const loc =
                      field?.latitude && field?.longitude
                        ? {
                            latitude: field.latitude,
                            longitude: field.longitude,
                          }
                        : null;

                    if (loc) {
                      setLocation(loc);
                    }

                    navigation.navigate('LocationPicker', {
                      initialLocation: loc,
                    });
                  }}>
                  <Text style={{color: strWhiteColor}}>{formatted}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => removeAddress(i)}
                  style={{marginLeft: 8}}>
                  <Icon name="delete" size={22} color={strPrimaryColor} />
                </TouchableOpacity>
              </View>
            );
          })}

          {/* Save button */}
          <TouchableOpacity
            style={Styles.saveBtn}
            onPress={handleSubmit(onSubmit)}>
            <Text style={Styles.saveText}>Save</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
