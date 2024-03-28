import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar, KeyboardAvoidingView, Button, TouchableWithoutFeedback } from 'react-native';
import { images } from '../Content/resources';
import { Styles } from '../styles/Login';
import { ArrowBack } from '../Components/ArrowBack';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { strPrimaryColor } from '../styles/responsive';
import styles from 'rn-range-slider/styles';
import FastImage from 'react-native-fast-image';

const Login = ({ navigation }: any) => {
    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            email: "",
            password: ''
        }
    })
    const EmailIcon = <TextInput.Icon icon={images.EmailIcon} color={strPrimaryColor} />
    const PasswordIcon = <TextInput.Icon icon={images.PasswordIcon} color={strPrimaryColor} />
    const PasswordShowIcon = <TextInput.Icon icon={images.PasswordShowIcon} color={strPrimaryColor} />
    const PasswordHiddenIcon = <TextInput.Icon icon={images.PasswordHiddenIcon} color={strPrimaryColor} />

    const onSubmit = (data: any) => {
        console.log('Submitted Data:', data);
    };
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
                    rules={{
                        maxLength: 5,
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
                    name="email"
                />
                {errors.email && <Text>This is required.</Text>}
                <Controller
                    control={control}
                    rules={{
                        maxLength: 5,
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
                                secureTextEntry={true}
                                left={PasswordIcon}
                                right={PasswordHiddenIcon}
                                underlineStyle={{ display: 'none' }}
                            />
                        </View>
                    )}
                    name="password"
                />
                {errors.password && <Text>This is required.</Text>}
                <TouchableWithoutFeedback>
                    <View style={Styles.forgetPassContainer}>
                        <Text style={Styles.txtForgetPassword}>Forget password</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleSubmit(onSubmit)} >
                    <View style={Styles.btnSubmitContainer}>
                        <Text style={Styles.txtButtonSubmit}>
                            Log in
                        </Text>
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
        </View>
    );
}
export default Login;

