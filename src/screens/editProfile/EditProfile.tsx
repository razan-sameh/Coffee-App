import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
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
import {
  strInpitColor,
  strPrimaryColor,
  strWhiteColor,
} from '../../styles/responsive';
import {useLocation} from '../../provider/LocationProvider';
import {formatLocation} from '../../Content/Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {updateUserProfileAsync} from '../../redux/slices/userSlice';
import {Controller, useForm, useFieldArray} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import PhoneInput from 'react-native-phone-number-input';
import {typPhone} from '../../Content/Types';

type FormValues = {
  firstName: string;
  lastName: string;
  phones: typPhone[];
  addresses: any[];
  profilePicture: string | null;
};

export default function EditProfile() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useSelector((state: RootState) => state.user);
  const {setLocation, location, isPicked, setIsPicked} = useLocation();
  const dispatch = useAppDispatch();
  const phoneInputRef = useRef<PhoneInput>(null);
  const [saving, setSaving] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phones: (user?.phoneNumber ?? []).map(p => ({
        number: p.number,
        countryCode: p.countryCode || '+20',
        countryISO: p.countryISO || 'EG',
      })),

      addresses: user?.address ?? [],
      profilePicture: user?.profilePicture || null,
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

  useEffect(() => {
    if (location && isPicked) {
      addAddress(location);
      setIsPicked(false);
    }
  }, [location, isPicked, addAddress, setIsPicked]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (!user?.Uid) {
        return;
      }

      setSaving(true); // ← start loading immediately

      const updates: any = {};

      if (data.firstName !== user.firstName) {
        updates.firstName = data.firstName;
      }
      if (data.lastName !== user.lastName) {
        updates.lastName = data.lastName;
      }
      if (JSON.stringify(data.phones) !== JSON.stringify(user.phoneNumber)) {
        updates.phoneNumber = data.phones.map(p => ({
          number: p.number,
          countryCode: p.countryCode || '+20',
          countryISO: p.countryISO || 'EG',
        }));
      }
      if (JSON.stringify(data.addresses) !== JSON.stringify(user.address)) {
        updates.address = data.addresses;
      }

      if (data.profilePicture && data.profilePicture !== user.profilePicture) {
        const reference = storage().ref(
          `profilePictures/${user.Uid}/profile.jpg`,
        );
        await reference.putFile(data.profilePicture);
        const downloadURL = await reference.getDownloadURL();
        updates.profilePicture = downloadURL;
      }

      if (Object.keys(updates).length > 0) {
        await dispatch(updateUserProfileAsync({Uid: user.Uid, ...updates}));
      } else {
        console.log('⚠️ Nothing changed');
      }

      navigation.goBack();
    } catch (error) {
      console.error('❌ Update failed:', error);
      ToastAndroid.showWithGravityAndOffset(
        `Update failed: ${error}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } finally {
      setSaving(false); // ← stop loading when done
    }
  };

  const handlePickImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.8}, response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setValue('profilePicture', uri!);
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={Styles.mainContainer}>
        <ArrowBack />

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
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={Styles.profileContainer}>
            <Controller
              control={control}
              name="profilePicture"
              render={({field: {value}}) => (
                <>
                  <FastImage
                    style={Styles.profileImage}
                    resizeMode="cover"
                    source={value ? {uri: value} : images.User}
                  />
                  <TouchableOpacity
                    style={Styles.editIcon}
                    onPress={handlePickImage}>
                    <Icon name="camera-outline" size={20} color="#fff" />
                  </TouchableOpacity>
                </>
              )}
            />
          </View>

          {/* First Name */}
          <Text style={Styles.sectionTitle}>First Name</Text>
          <Controller
            control={control}
            name="firstName"
            rules={{required: true}}
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
            rules={{required: true}}
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
            <TouchableOpacity
              onPress={() => addPhone({number: '', countryCode: ''})}>
              <Text style={Styles.addText}>+ Add Phone</Text>
            </TouchableOpacity>
          </View>
          {phoneFields.map((field, i) => (
            <View key={field.id} style={{marginBottom: 10}}>
              <View style={Styles.contantContainer}>
                <Controller
                  control={control}
                  name={`phones.${i}.number`}
                  rules={{required: true}}
                  render={({field: {onChange, value}}) => (
                    <PhoneInput
                      ref={phoneInputRef}
                      defaultCode={field.countryISO || 'EG'} // استخدمي الكود المتسجل أو fallback
                      layout="first"
                      containerStyle={Styles.input}
                      textContainerStyle={{backgroundColor: 'transparent'}}
                      textInputStyle={{color: strWhiteColor}}
                      codeTextStyle={{color: strWhiteColor}}
                      value={value}
                      textInputProps={{
                        placeholderTextColor: strInpitColor,
                      }}
                      renderDropdownImage={
                        <Icon
                          name="chevron-down"
                          size={18}
                          color={strWhiteColor}
                        />
                      }
                      flagButtonStyle={{alignSelf: 'center'}}
                      onChangeText={text => {
                        onChange(text);
                      }}
                      onChangeCountry={country => {
                        setValue(
                          `phones.${i}.countryCode`,
                          `+${country.callingCode[0]}`,
                        );
                        setValue(`phones.${i}.countryISO`, country.cca2); // هنا نخزن ISO
                      }}
                    />
                  )}
                />

                <TouchableOpacity
                  onPress={() => removePhone(i)}
                  style={{marginLeft: 8}}>
                  <Icon name="delete" size={22} color={strPrimaryColor} />
                </TouchableOpacity>
              </View>

              {errors.phones?.[i]?.number?.type === 'required' && (
                <Text style={Styles.txtError}>This is required.</Text>
              )}
            </View>
          ))}

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
            style={[Styles.saveBtn, saving && {opacity: 0.6}]}
            onPress={handleSubmit(onSubmit)}
            disabled={saving}>
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={Styles.saveText}>Save</Text>
            )}
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
