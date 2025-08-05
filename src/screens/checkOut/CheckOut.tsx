import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {images} from '../../Content/resources';
import {Styles} from '../../styles/CheckOut';
import {ArrowBack} from '../../Components/ArrowBack';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {strSecondColor} from '../../styles/responsive';
import FastImage from 'react-native-fast-image';
import {typCheckout} from '../../Content/Types';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {getUserID} from '../../Content/Authentication';
import {RootState, useAppDispatch} from '../../redux/store';
import {addUserDetails} from '../../redux/slices/userSlice';
import {useSelector} from 'react-redux';
import CheckOutField from './CheckOutField';

const CheckOut = () => {
  const {
    control,
    handleSubmit: handleCheckOut,
    formState: {errors},
  } = useForm<typCheckout>({
    defaultValues: {
      strFullName: '',
      strPhoneNumber: '',
      strAddress: '',
    },
  });
  const [blnIsCheckOut, setIsCheckOut] = useState<boolean>(false);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useSelector((state: RootState) => state.user);
  const [blnIsAddingAddress, setIsAddingAddress] = useState<boolean>(false);
  const [blnIsAddingPhoneNumber, setIsAddingPhoneNumber] =
    useState<boolean>(false);
  const [blnSavePhone, setSavePhone] = useState<boolean>(false);
  const [blnSaveAddress, setSaveAddress] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onCheckOut = async (data: typCheckout) => {
    console.log('Submitted Data:', data);
    setIsCheckOut(true);
    try {
      const userID = getUserID();
      if (userID) {
        if (blnSavePhone || blnSaveAddress) {
          dispatch(
            addUserDetails({
              Uid: userID,
              ...(blnSavePhone && {phoneNumber: data.strPhoneNumber}),
              ...(blnSaveAddress && {address: data.strAddress}),
            }),
          );
        }
      }
      navigation.navigate('CartNavigator', {
        screen: 'Payment',
      });
    } catch (error) {
      console.log('Error', error);
    }
    setIsCheckOut(false);
  };

  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.backArrowContainer}>
        <ArrowBack />
        <Text style={Styles.txtTitle}>CheckOut</Text>
      </View>
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
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
        <Controller
          control={control}
          name="strFullName"
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View>
              <Text style={Styles.txtInputTitle}>Full Name</Text>
              <TextInput
                style={Styles.input}
                textContentType="name"
                placeholderTextColor={'#A19D9D'}
                placeholder="Your Full Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                underlineStyle={{display: 'none'}}
              />
            </View>
          )}
        />
        {errors.strFullName && errors.strFullName.type === 'required' && (
          <Text style={Styles.txtError}>This is required.</Text>
        )}
        <Controller
          control={control}
          name="strPhoneNumber"
          rules={{
            pattern: /^(01[0125][0-9]{8}|0[2-9][0-9]{8})$/,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CheckOutField
              label="Phone Number"
              placeholder="Phone Number"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              userValues={user?.phoneNumber}
              isAdding={blnIsAddingPhoneNumber}
              setIsAdding={setIsAddingPhoneNumber}
              saveValue={blnSavePhone}
              setSaveValue={setSavePhone}
              hasError={!!errors.strPhoneNumber}
              errorMessage={
                errors.strPhoneNumber?.type === 'pattern'
                  ? 'The Phone Number must be 11 digits.'
                  : 'This is required.'
              }
            />
          )}
        />

        <Controller
          control={control}
          name="strAddress"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <CheckOutField
              label="Address"
              placeholder="Address"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              userValues={user?.address}
              isAdding={blnIsAddingAddress}
              setIsAdding={setIsAddingAddress}
              saveValue={blnSaveAddress}
              setSaveValue={setSaveAddress}
              hasError={!!errors.strAddress}
              errorMessage="This is required."
            />
          )}
        />

        <TouchableWithoutFeedback onPress={handleCheckOut(onCheckOut)}>
          <View style={Styles.btnSubmitContainer}>
            {blnIsCheckOut ? (
              <ActivityIndicator size={20} color={strSecondColor} />
            ) : (
              <Text style={Styles.txtButtonSubmit}>Payment</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default CheckOut;
