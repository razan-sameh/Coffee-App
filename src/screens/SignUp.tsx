import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {images} from '../Content/resources';
import {Styles} from '../styles/SignUp';
import {ArrowBack} from '../Components/ArrowBack';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {strPrimaryColor, strSecondColor} from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import {typSignUp} from '../Content/Types';
import {
  createAccountWithEmail,
  signinWithGoogle,
} from '../Content/Authentication';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<typSignUp>({
    defaultValues: {
      strEmail: '',
      strPassword: '',
      strFirstName: '',
      strLastName: '',
    },
  });
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [blnIsSign, setIsSign] = useState<boolean>(false);
  const [blnSecureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const EmailIcon = (
    <TextInput.Icon icon={images.EmailIcon} color={strPrimaryColor} />
  );
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
  const FullNameIcon = (
    <TextInput.Icon icon={images.FullNameIcon} color={strPrimaryColor} />
  );

  const onSubmit = (data: typSignUp) => {
    console.log('Submitted Data:', data);
    setIsSign(true);
    createAccountWithEmail(
      data,
      () => {
        navigation.navigate('DrawerNavigator', {screen: 'TapNavigator'});
      },
      () => {
        setIsSign(false);
      },
    );
  };

  function onGoogleButtonPress() {
    signinWithGoogle().then(() => {
      navigation.navigate('DrawerNavigator', {screen: 'TapNavigator'});
    });
  }

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
        source={images.SignUpWallIcon1}
      />
      <FastImage
        style={Styles.wallCoffeeImage2}
        resizeMode="contain"
        source={images.SignUpWallIcon2}
      />
      <Text style={Styles.txtTitle}>Hello! Register Now</Text>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
        <Controller
          control={control}
          name="strFirstName"
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
                placeholder="First Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                left={FullNameIcon}
                underlineStyle={{display: 'none'}}
              />
            </View>
          )}
        />
        {errors.strFirstName && (
          <Text style={Styles.txtError}>This is required.</Text>
        )}
        <Controller
          control={control}
          name="strLastName"
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
                placeholder="Last Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                left={FullNameIcon}
                underlineStyle={{display: 'none'}}
              />
            </View>
          )}
        />
        {errors.strLastName && (
          <Text style={Styles.txtError}>This is required.</Text>
        )}
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
            {blnIsSign ? (
              <ActivityIndicator size={20} color={strSecondColor} />
            ) : (
              <Text style={Styles.txtButtonSubmit}>Sign Up</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={Styles.lineContainer}>
        <View style={Styles.line} />
        <View>
          <Text style={Styles.txtline}>Or sign up with</Text>
        </View>
        <View style={Styles.line} />
      </View>
      <View style={Styles.iconsContainer}>
        <TouchableWithoutFeedback>
          <FastImage style={Styles.icons} source={images.facebookIcon} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <FastImage style={Styles.icons} source={images.twitterIcon} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onGoogleButtonPress()}>
          <FastImage style={Styles.icons} source={images.googleIcon} />
        </TouchableWithoutFeedback>
      </View>
      <View style={Styles.navigateContainer}>
        <Text style={Styles.txtAsk}>Already a member?</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <Text style={Styles.txtNavigate}> Login</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
export default SignUp;
