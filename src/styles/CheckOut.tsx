import { StyleSheet } from "react-native";
import { moderateScale, strSecondColor, mbdlScreenHeight, mdblBAR_HEIGHT, strINTER_SEMIBOLD600_Font, strPrimaryColor, heightScale, widthScale, strWhiteColor, mdblScreenWidth, strINTER_MEDIUM500_Font } from "./responsive";

export const Styles = StyleSheet.create({
    mainContainer: {
        paddingLeft: moderateScale(16),
        paddingRight: moderateScale(16),
        paddingTop: mdblBAR_HEIGHT,
        backgroundColor: strSecondColor,
        height: mbdlScreenHeight + mdblBAR_HEIGHT
    },
    backArrowContainer: {
        // width:mdblScreenWidth /2 ,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:moderateScale(20),
    },
    txtTitle:{
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(24),
        color: strPrimaryColor,
        textAlign:'right',
        marginLeft: mdblScreenWidth/5
    },
    txtInputTitle: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(14),
        color: strPrimaryColor,
        marginBottom: moderateScale(10),
        marginTop: moderateScale(10),
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
    forgetPassContainer: {
        width: widthScale(343),
        marginTop: moderateScale(10),
        alignItems: 'flex-end',
    },
    txtForgetPassword: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(13),
        color: strPrimaryColor,
    },
    btnSubmitContainer: {
        width: widthScale(343),
        height: heightScale(44),
        marginTop: moderateScale(100),
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
        marginTop: moderateScale(40),
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: strPrimaryColor
    },
    txtline: {
        width: widthScale(90),
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
    wallCoffeeImage1: {
        width: widthScale(90),
        height: heightScale(90),
        position: 'absolute',
        top: '55%',
        left: -17
    },
    wallCoffeeImage2: {
        width: widthScale(58),
        height: heightScale(58),
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
    },
    footerContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:moderateScale(10),
    },
    checkboxContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    txtRemember:{
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(14),
        color: strPrimaryColor, 
    },
    pickerContainer: {
        width: widthScale(343),
        height: heightScale(44),
        backgroundColor: strWhiteColor,
        borderRadius: moderateScale(20),
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        overflow: 'hidden',
        justifyContent:'center'
    },
    txtAdd:{
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(14),
        color: strPrimaryColor, 
        textDecorationLine:'underline'
    },
    addContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        marginTop:moderateScale(10),
    }
});