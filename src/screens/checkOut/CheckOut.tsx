import React, {useEffect, useState} from 'react';
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
import {RootState, useAppDispatch} from '../../redux/store';
import {addUserDetails} from '../../redux/slices/userSlice';
import {useSelector} from 'react-redux';
import CheckOutField from './component/CheckOutField';
import {setDeliveryInfo} from '../../redux/slices/deliveryInfoSlice';
import {getUserID, getUserName} from '../../services/Authentication';

const CheckOut = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const {
    control,
    handleSubmit: handleCheckOut,
    setValue,
    formState: {errors},
  } = useForm<typCheckout>({
    defaultValues: {
      strFullName: getUserName()!,
      strPhoneNumber: user?.phoneNumber?.[0] || '',
      strAddress: user?.address?.[0] || '',
    },
  });
  const [blnIsCheckOut, setIsCheckOut] = useState<boolean>(false);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [blnIsAddingAddress, setIsAddingAddress] = useState<boolean>(false);
  const [blnIsAddingPhoneNumber, setIsAddingPhoneNumber] =
    useState<boolean>(false);
  const [blnSavePhone, setSavePhone] = useState<boolean>(false);
  const [blnSaveAddress, setSaveAddress] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !blnIsAddingPhoneNumber &&
      user?.phoneNumber?.length &&
      !control._formValues.strPhoneNumber
    ) {
      setValue('strPhoneNumber', user.phoneNumber[0]);
    }
  }, [
    user?.phoneNumber,
    blnIsAddingPhoneNumber,
    control._formValues.strPhoneNumber,
    setValue,
  ]);

  useEffect(() => {
    if (
      !blnIsAddingAddress &&
      user?.address?.length &&
      !control._formValues.strAddress
    ) {
      setValue('strAddress', user.address[0]);
    }
  }, [
    user?.address,
    blnIsAddingAddress,
    control._formValues.strAddress,
    setValue,
  ]);

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
      dispatch(
        setDeliveryInfo({
          name: data.strFullName,
          address: data.strAddress,
          phone: data.strPhoneNumber,
        }),
      );
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
      {/* <FastImage
        style={Styles.wave}
        resizeMode="contain"
        source={images.WallWave}
      /> */}
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
