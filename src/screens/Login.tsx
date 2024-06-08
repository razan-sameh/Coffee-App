import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, ToastAndroid, ActivityIndicator, Alert } from 'react-native';
import { images } from '../Content/resources';
import { Styles } from '../styles/Login';
import { ArrowBack } from '../Components/ArrowBack';
import { Control, Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { strPrimaryColor, strSecondColor } from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import { typLogin } from '../Content/Types';
import { EmailJSResponseStatus, send } from '@emailjs/react-native';

const Login = ({ navigation }: any) => {
    const { control, handleSubmit, formState: { errors }, } = useForm<typLogin>({
        defaultValues: {
            strEmail: "",
            strPassword: ''
        }
    })
    const [blnIsSign, setIsSign] = useState<boolean>(false);
    const [blnSecureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const EmailIcon = <TextInput.Icon icon={images.EmailIcon} color={strPrimaryColor} />
    const PasswordIcon = <TextInput.Icon icon={images.PasswordIcon} color={strPrimaryColor} />
    const PasswordShowIcon = <TextInput.Icon onPress={() => setSecureTextEntry(true)} icon={images.PasswordShowIcon} color={strPrimaryColor} />
    const PasswordHiddenIcon = <TextInput.Icon onPress={() => setSecureTextEntry(false)} icon={images.PasswordHiddenIcon} color={strPrimaryColor} />

    const onSubmit = (data: typLogin) => {
        console.log('Submitted Data:', data);
        setIsSign(true)
        auth().signInWithEmailAndPassword(data.strEmail, data.strPassword)
            .then((res) => {
                console.log(res)
                console.log('User logged-in successfully!')
                navigation.navigate("TapNavigator")
            })
            .catch(error => {
                console.log(error.code);
                setIsSign(false)
                if (error.code === 'auth/invalid-credential') {
                    ToastAndroid.showWithGravityAndOffset('The account or password is not correct!', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50,);
                }
                else {
                    ToastAndroid.showWithGravityAndOffset('Authentication failed.', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50,);
                }
            })
    }

    return (
        <View style={Styles.mainContainer}>
            <ArrowBack />
            <FastImage style={Styles.wave} resizeMode='contain' source={images.WallWave} />
            <FastImage style={Styles.LoginWallIcon1} resizeMode='contain' source={images.LoginWallIcon1} />
            <FastImage style={Styles.LoginWallIcon2} resizeMode='contain' source={images.LoginWallIcon2} />
            <Text style={Styles.txtTitle}>Welcome Back!</Text>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0}>
                <Controller
                    control={control}
                    name="strEmail"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Text style={Styles.txtInputTitle}>E-mail</Text>
                            <TextInput
                                style={Styles.input}
                                textContentType='emailAddress'
                                placeholderTextColor={'#A19D9D'}
                                placeholder="Your e-mail"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                left={EmailIcon}
                                underlineStyle={{ display: 'none' }}
                            />
                        </View>
                    )}
                />
                {errors.strEmail && errors.strEmail.type === 'required' && <Text style={Styles.txtError}>This is required.</Text>}
                <Controller
                    control={control}
                    name="strPassword"
                    rules={{
                        pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Text style={Styles.txtInputTitle}>Password</Text>
                            <TextInput
                                style={Styles.input}
                                textContentType='password'
                                placeholder="Password"
                                placeholderTextColor={'#A19D9D'}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={blnSecureTextEntry}
                                left={PasswordIcon}
                                right={blnSecureTextEntry ? PasswordHiddenIcon : PasswordShowIcon}
                                underlineStyle={{ display: 'none' }}
                            />
                        </View>
                    )}
                />
                {errors.strPassword && errors.strPassword.type === 'pattern' && <Text style={Styles.txtError}>The password must contain digit, lowercase letter, uppercase letter, special character, no space, and it must be 8-16 characters long.</Text>}
                {errors.strPassword && errors.strPassword.type === 'required' && <Text style={Styles.txtError}>This is required.</Text>}
                <TouchableWithoutFeedback onPress={() => navigation.navigate("ForgetPassword")}>
                    <View style={Styles.forgetPassContainer}>
                        <Text style={Styles.txtForgetPassword}>Forget password</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)} >
                    <View style={Styles.btnSubmitContainer}>
                        {
                            blnIsSign ?
                                <ActivityIndicator size={20} color={strSecondColor} />
                                :
                                <Text style={Styles.txtButtonSubmit}>
                                    Login
                                </Text>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <View style={Styles.lineContainer}>
                <View style={Styles.line} />
                <View>
                    <Text style={Styles.txtline}>Or log in with</Text>
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
                <TouchableWithoutFeedback>
                    <FastImage style={Styles.icons} source={images.googleIcon} />
                </TouchableWithoutFeedback>
            </View>
            <View style={Styles.navigateContainer}>
                <Text style={Styles.txtAsk}>Don't have an account?</Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
                    <Text style={Styles.txtNavigate}> Sign up</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}
export default Login;

