import { StyleSheet } from "react-native";
import { moderateScale, strSecondColor, mbdlScreenHeight, mdblBAR_HEIGHT, strINTER_SEMIBOLD600_Font, strPrimaryColor, heightScale, widthScale, strWhiteColor, mdblScreenWidth } from "./responsive";

export const Styles = StyleSheet.create({
    mainContainer: {
        paddingLeft: moderateScale(16),
        paddingRight: moderateScale(16),
        paddingTop: mdblBAR_HEIGHT ,
        backgroundColor: strSecondColor,
        height: mbdlScreenHeight + mdblBAR_HEIGHT
    },
    txtTitle: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(24),
        color: strPrimaryColor,
    },
    txtInputTitle: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(14),
        color: strPrimaryColor,
        marginBottom: moderateScale(10),
        marginTop: moderateScale(20),
    },
    input: {
        width: widthScale(343),
        height: heightScale(44),
        backgroundColor: strWhiteColor,
        borderRadius: moderateScale(20),
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
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
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(20),
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: strPrimaryColor
    },
    txtline: {
        width: widthScale(120),
        textAlign: 'center',
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(14),
        color: strPrimaryColor,
    },
    iconsContainer: {
        flexDirection: 'row',
        width: widthScale(152),
        height: heightScale(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    icons: {
        width: 36,
        height: 36,
        borderRadius: 50
    },
    wave: {
        width: mdblScreenWidth,
        height: heightScale(200),
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    SignUpWallIcon1: {
        width: widthScale(63),
        height: heightScale(63),
        position: 'absolute',
        top: '7%',
        right: -17
    },
    SignUpWallIcon2: {
        width: widthScale(66),
        height: heightScale(66),
        position: 'absolute',
        top: '80%',
        right: -5
    },
    navigateContainer:{
        width: widthScale(375),
        height:heightScale(100),
        position: 'absolute',
        bottom: 0,
        right:0,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    txtAsk:{
        textAlign: 'center',
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(14),
        color: strWhiteColor,
    },
    txtNavigate:{
        textAlign: 'center',
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(14),
        color: strSecondColor, 
        textDecorationLine:'underline'
    },
    txtError:{
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(14),
        color: strPrimaryColor, 
    }
});