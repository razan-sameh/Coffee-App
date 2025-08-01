import React, {useEffect, useState} from 'react';
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
import {Styles} from '../styles/ForgetPassword';
import {ArrowBack} from '../Components/ArrowBack';
import {Control, Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {strPrimaryColor, strSecondColor} from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import {EmailJSResponseStatus, send} from '@emailjs/react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const ForgetPassword = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      strEmail: '',
    },
  });
  const [blnIsSendEmail, setSendEmail] = useState<boolean>(false);
  const [strOtp, setOtp] = useState<string>('');
  const EmailIcon = (
    <TextInput.Icon icon={images.EmailIcon} color={strPrimaryColor} />
  );
  const generateOtp = () => {
    let Otp = '';
    const characters = '0123456789';
    for (let i = 0; i < 4; i++) {
      Otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return Otp;
  };

  useEffect(() => {
    if (!blnIsSendEmail) {
      setOtp(generateOtp());
    }
  }, [blnIsSendEmail]);

  const sendEmail = async (email: string | undefined) => {
    console.log('email', email);
    setSendEmail(true);
    if (email != undefined || email != '') {
      try {
        await send(
          'service_h8e83zf',
          'template_6b96vxy',
          {
            email: `${email}`,
            message: ` ${strOtp}`,
          },
          {
            publicKey: 'dHAuW7eHQvNC5nb7_',
          },
        );
        console.log('SUCCESS!');
        navigation.navigate('OTPVerification', {otp: strOtp, email: email});
      } catch (err) {
        setSendEmail(false);
        if (err instanceof EmailJSResponseStatus) {
          console.log('EmailJS Request Failed...', err);
          ToastAndroid.showWithGravityAndOffset(
            err.text,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
        console.log('ERROR', err);
      }
    }
  };

  const forgotPassword = async (email: string) => {
    setSendEmail(true);
    await auth()
      .sendPasswordResetEmail(email)
      .then(res => {
        console.log(res);
        ToastAndroid.showWithGravityAndOffset(
          'Check your email',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log('Error sending password reset:', error);
        if (error.code == 'auth/invalid-email') {
          ToastAndroid.showWithGravityAndOffset(
            'Invalid Email", "No user corresponding to that email address.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if (error.code == 'auth/user-not-found') {
          ToastAndroid.showWithGravityAndOffset(
            'User Error", "Email may not be verified, check email.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
        setSendEmail(false);
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
      <Text style={Styles.txtTitle}>Forget Password</Text>
      <View style={Styles.instructionContainer}>
        <Text style={Styles.titleInstruction}>Mail Address Here</Text>
        <Text style={Styles.txtInstruction}>
          Enter the e-mail address here associated with your account.
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
        <Controller
          control={control}
          name="strEmail"
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View>
              <Text style={Styles.txtInputTitle}>E-mail</Text>
              <TextInput
                style={Styles.input}
                textContentType="emailAddress"
                placeholderTextColor={'#A19D9D'}
                placeholder="Your e-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                left={EmailIcon}
                underlineStyle={{display: 'none'}}
              />
            </View>
          )}
        />
        {errors.strEmail && errors.strEmail.type === 'required' && (
          <Text style={Styles.txtError}>This is required.</Text>
        )}
        <TouchableWithoutFeedback
          onPress={handleSubmit(() =>
            forgotPassword(control._formValues.strEmail),
          )}>
          <View style={Styles.btnSubmitContainer}>
            {blnIsSendEmail ? (
              <ActivityIndicator size={20} color={strSecondColor} />
            ) : (
              <Text style={Styles.txtButtonSubmit}>Recover Password</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default ForgetPassword;
