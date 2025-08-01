import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {images} from '../Content/resources';
import {Styles} from '../styles/ResetPassword';
import {ArrowBack} from '../Components/ArrowBack';
import {Control, Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {strPrimaryColor, strSecondColor} from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      strPassword: '',
      strConfirmPassword: '',
    },
  });
  const [blnIsResetPassword, setResetPassword] = useState<boolean>(false);
  const [blnSecureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const PasswordIcon = (
    <TextInput.Icon icon={images.PasswordIcon} color={strPrimaryColor} />
  );
  const PasswordShowIcon = (
    <TextInput.Icon
      onPress={() => setSecureTextEntry(true)}
      icon={images.PasswordShowIcon}
      color={strPrimaryColor}
    />
  );
  const PasswordHiddenIcon = (
    <TextInput.Icon
      onPress={() => setSecureTextEntry(false)}
      icon={images.PasswordHiddenIcon}
      color={strPrimaryColor}
    />
  );
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
    setResetPassword(true);
    auth()
      .confirmPasswordReset('1234', 'Ra@1235678')
      .then(res => {
        console.log(res);
        console.log('User logged-in successfully!');
        navigation.navigate('DrawerNavigator');
      })
      .catch(error => {
        console.log(error.code);
        setResetPassword(false);
        if (error.code === 'auth/invalid-credential') {
          ToastAndroid.showWithGravityAndOffset(
            'That account is not found!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Authentication failed.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      });
  };

  return (
    <View style={Styles.mainContainer}>
      <ArrowBack />
      <FastImage
        style={Styles.wave}
        resizeMode="contain"
        source={images.WallWave}
      />
      <FastImage
        style={Styles.wallCoffeeImage1}
        resizeMode="contain"
        source={images.ForgetPasswordwallIcon1}
      />
      <FastImage
        style={Styles.wallCoffeeImage2}
        resizeMode="contain"
        source={images.ForgetPasswordwallIcon2}
      />
      <View style={Styles.instructionContainer}>
        <Text style={Styles.titleInstruction}>Enter New Password</Text>
        <Text style={Styles.txtInstruction}>
          Your new password must be different from previously used passowrd
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
        <Controller
          control={control}
          name="strPassword"
          rules={{
            pattern:
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View>
              <Text style={Styles.txtInputTitle}>Password</Text>
              <TextInput
                style={Styles.input}
                textContentType="password"
                placeholder="Password"
                placeholderTextColor={'#A19D9D'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={blnSecureTextEntry}
                left={PasswordIcon}
                right={
                  blnSecureTextEntry ? PasswordHiddenIcon : PasswordShowIcon
                }
                underlineStyle={{display: 'none'}}
              />
            </View>
          )}
        />
        {errors.strPassword && errors.strPassword.type === 'pattern' && (
          <Text style={Styles.txtError}>
            The password must contain digit, lowercase letter, uppercase letter,
            special character, no space, and it must be 8-16 characters long.
          </Text>
        )}
        {errors.strPassword && errors.strPassword.type === 'required' && (
          <Text style={Styles.txtError}>This is required.</Text>
        )}
        <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <View style={Styles.btnSubmitContainer}>
            {blnIsResetPassword ? (
              <ActivityIndicator size={20} color={strSecondColor} />
            ) : (
              <Text style={Styles.txtButtonSubmit}>Reset Password</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default ResetPassword;
