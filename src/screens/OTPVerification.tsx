import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, ToastAndroid, ActivityIndicator } from 'react-native';
import { images } from '../Content/resources';
import { Styles } from '../styles/OTPVerification';
import { ArrowBack } from '../Components/ArrowBack';
import {strSecondColor } from '../styles/responsive';
import FastImage from 'react-native-fast-image';
import OtpTextInput from 'react-native-text-input-otp';

const OTPVerification = ({ ...props }: any) => {
    const [blnIsVerified, setVerified] = useState<boolean>(false);
    const [otp, setOtp] = React.useState('');
    const strOtpParam = props.route.params.otp //'1234' 
    const strEmailParam = props.route.params.email  


    function verifyOtp() {
        setVerified(true)
        if (otp.length == 4) {
            if (strOtpParam === otp) {
                props.navigation.navigate('ResetPassword',{email:strEmailParam})
            }
            else {
                ToastAndroid.showWithGravityAndOffset('Wrong Number', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50,);
                setVerified(false)
            }
        }
        else {
            ToastAndroid.showWithGravityAndOffset('You must enter four numbers', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50,);
            setVerified(false)
        }
        console.log('props', strOtpParam);
    }

    return (
        <View style={Styles.mainContainer}>
            <ArrowBack />
            <FastImage style={Styles.wave} resizeMode='contain' source={images.WallWave} />
            <FastImage style={Styles.otpVerficationIcon1} resizeMode='contain' source={images.OtpVerficationIcon1} />
            <FastImage style={Styles.forgetPasswordwallIcon2} resizeMode='contain' source={images.ForgetPasswordwallIcon2} />
            <Text style={Styles.txtTitle}>OTP Verification</Text>
            <View style={Styles.instructionContainer}>
                <Text style={Styles.titleInstruction}>Get your Code</Text>
                <Text style={Styles.txtInstruction}>Please enter the 4 digit code that send to your e-mail address</Text>
            </View>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0}>
                <View>
                    <OtpTextInput
                        otp={otp}
                        setOtp={setOtp}
                        digits={4}
                        style={Styles.otpInput}
                        fontStyle={Styles.txtOtpInput}
                        focusedStyle={Styles.focusedItem}
                    />
                </View>
                <TouchableWithoutFeedback onPress={() => verifyOtp()}>
                    <View style={Styles.btnSubmitContainer}>
                        {
                            blnIsVerified ?
                                <ActivityIndicator size={20} color={strSecondColor} />
                                :
                                <Text style={Styles.txtButtonSubmit}>
                                    Verify
                                </Text>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}
export default OTPVerification;

