import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, ToastAndroid, ActivityIndicator, Alert } from 'react-native';
import { images } from '../Content/resources';
import { Styles } from '../styles/ForgetPassword';
import { ArrowBack } from '../Components/ArrowBack';
import { Control, Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { strPrimaryColor, strSecondColor } from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import { EmailJSResponseStatus, send } from '@emailjs/react-native';

const ForgetPassword = ({ navigation }: any) => {
    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            strEmail: ""
        }
    })
    const [blnIsSendEmail, setSendEmail] = useState<boolean>(false);
    const [strOtp, setOtp] = useState<string>('');
    const EmailIcon = <TextInput.Icon icon={images.EmailIcon} color={strPrimaryColor} />
    const generateOtp = () => {
        let Otp = '';
        const characters =
            '0123456789';
        for (let i = 0; i < 5; i++) {
            Otp += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return Otp;
    };

    const sendEmail = async () => {
        setSendEmail(true)
        // const isValidEmail = auth().getUserByEmail(email)
        //     .then((userRecord) => {
        //         // See the UserRecord reference doc for the contents of userRecord.
        //         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        //     })
        //     .catch((error) => {
        //         console.log('Error fetching user data:', error);
        //     });
        // console.log('isValidEmail', isValidEmail);
        // if (isValidEmail) {
            try {
                await send(
                    'service_h8e83zf',
                    'template_6b96vxy',
                    {
                        email: 'razansameh53@gmail.com',
                        message: ` ${setOtp(generateOtp())}`,
                    },
                    {
                        publicKey: 'dHAuW7eHQvNC5nb7_',
                    },
                );
                console.log('SUCCESS!');
                navigation.navigate("TapNavigator")
            } catch (err) {
                if (err instanceof EmailJSResponseStatus) {
                    console.log('EmailJS Request Failed...', err);
                }
                console.log('ERROR', err);
                setSendEmail(true)
            }
        // }
        // else {
        //     ToastAndroid.showWithGravityAndOffset('There is no account by this mail', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50,);
        //     setSendEmail(true)
        // }
    };


    return (
        <View style={Styles.mainContainer}>
            <ArrowBack />
            <FastImage style={Styles.wave} resizeMode='contain' source={images.WallWave} />
            <FastImage style={Styles.forgetPasswordwallIcon1} resizeMode='contain' source={images.ForgetPasswordwallIcon1} />
            <FastImage style={Styles.forgetPasswordwallIcon2} resizeMode='contain' source={images.ForgetPasswordwallIcon2} />
            <Text style={Styles.txtTitle}>Forget Password</Text>
            <View style={Styles.instructionContainer}>
                <Text style={Styles.titleInstruction}>Mail Address Here</Text>
                <Text style={Styles.txtInstruction}>Enter the e-mail address here associated with your account.</Text>
            </View>
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
                <TouchableWithoutFeedback onPress={() => sendEmail()} >
                    <View style={Styles.btnSubmitContainer}>
                        {
                            blnIsSendEmail ?
                                <ActivityIndicator size={20} color={strSecondColor} />
                                :
                                <Text style={Styles.txtButtonSubmit}>
                                    Recover Password
                                </Text>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}
export default ForgetPassword;

