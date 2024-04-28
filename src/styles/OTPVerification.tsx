import { StyleSheet } from "react-native";
import { moderateScale, strSecondColor, mbdlScreenHeight, mdblBAR_HEIGHT, strINTER_SEMIBOLD600_Font, strPrimaryColor, heightScale, widthScale, strInpitBtnColor, mdblScreenWidth, strINTER_MEDIUM500_Font } from "./responsive";

export const Styles = StyleSheet.create({
    mainContainer: {
        paddingLeft: moderateScale(16),
        paddingRight: moderateScale(16),
        paddingTop: mdblBAR_HEIGHT,
        backgroundColor: strSecondColor,
        height: mbdlScreenHeight + mdblBAR_HEIGHT
    },
    txtTitle: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(24),
        color: strPrimaryColor,
        marginTop:moderateScale(30)
    }, 
    instructionContainer:{
        height:heightScale(84),
        width:widthScale(315),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        margin:moderateScale(20),
        marginTop: moderateScale(40),
    },
    titleInstruction:{
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(20),
        color: strPrimaryColor,
        marginBottom: moderateScale(20),
    },
    txtInstruction:{
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(16),
        color: 'white',
        textAlign:'center',
    },
    btnSubmitContainer: {
        width: widthScale(343),
        height: heightScale(44),
        marginTop: moderateScale(30),
        borderRadius: moderateScale(150),
        backgroundColor: strPrimaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtButtonSubmit: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(20),
        color: strSecondColor,
    },
    wave: {
        width: mdblScreenWidth,
        height: heightScale(200),
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    otpVerficationIcon1: {
        width: widthScale(63),
        height: heightScale(72),
        position: 'absolute',
        top: '60%',
        left: -7
    },
    forgetPasswordwallIcon2: {
        width: widthScale(58),
        height: heightScale(66),
        position: 'absolute',
        top: '80%',
        right: -5
    },
    otpInput:{
        width: widthScale(60),
        height: heightScale(70),
        backgroundColor: strPrimaryColor,
        borderRadius: moderateScale(5),
        borderWidth:0
    },
    txtOtpInput:{
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(32),
        color: strSecondColor, 
    },
    focusedItem:{
        borderColor: 'white', 
        borderBottomWidth: 2,
    }
});