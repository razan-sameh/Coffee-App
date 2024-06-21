import { StyleSheet } from "react-native";
import { heightScale, mbdlScreenHeight, mdblBAR_HEIGHT, mdblScreenWidth, moderateScale, strINTER_EXTRABOLD800_Font, strINTER_MEDIUM500_Font, strINTER_SEMIBOLD600_Font, strPrimaryColor, strSecondColor, widthScale } from "./responsive";
import { Styles as ArrowBackStyles } from '../Components/ArrowBack';


export const Styles = StyleSheet.create({
    wall: {
        height: mbdlScreenHeight + mdblBAR_HEIGHT,
        backgroundColor: strSecondColor,
    },
    wallCoffeeImage1: {
        position: 'absolute',
        top: mdblBAR_HEIGHT,
        right: 0,
        width: widthScale(53.69),
        height: heightScale(61.52),
    },
    wallCoffeeImage2: {
        position: 'absolute',
        bottom: '10%',
        left: 0,
        width: widthScale(38.87),
        height: heightScale(44.54)
    },
    backArrowContainer: {
        width:mdblScreenWidth /2 ,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft: moderateScale(15),
        paddingRight: moderateScale(15),
        paddingTop: mdblBAR_HEIGHT 
    },
    TitleContainer:{
        width:mdblScreenWidth /2 - 30,
        height:heightScale(36),
    },
    txtTitle:{
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(24),
        color: strPrimaryColor,
        textAlign:'right',
    },
    mainContainer:{
        paddingLeft:moderateScale(16),
        paddingRight:moderateScale(16),
        height: mbdlScreenHeight - ArrowBackStyles.arrowBackIcon.height - heightScale(36)
    },
    cartItemsContainer:{
        height: '70%' 
    },
    cartItemContainer:{
        width: widthScale(343),
        height: heightScale(112),
        borderRadius:moderateScale(30),
        backgroundColor:strPrimaryColor,
        flexDirection:'row',
        alignItems:'center',
        marginTop:moderateScale(10),
        paddingLeft:moderateScale(10),
        paddingRight:moderateScale(10),
    },
    ItemDetailsContainer:{
        flexDirection:'row',
        alignItems:'center',
        flex:2,
        height:'100%'
    },
    cartItemImg:{
        width:widthScale(95),
        height:heightScale(96),
        borderRadius:moderateScale(22),
        marginRight:moderateScale(10)
    },
    txtItemName:{
        fontFamily: strINTER_EXTRABOLD800_Font,
        fontSize: moderateScale(13),
        color: strSecondColor,
        flexWrap:'wrap'
    },
    txtItemPrice:{
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(13),
        color: 'white',
    },
    itemCountContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        width:widthScale(80),
        height:'100%'
    },
    itemCountSubContainer:{
        width:widthScale(36),
        height:heightScale(80),
        borderRadius:moderateScale(30),
        justifyContent:'center',
        alignItems:'center',
    },
    minusContainer:{
        backgroundColor:strPrimaryColor,
        borderWidth:1,
        borderColor:strSecondColor,
        width:24,
        height:24,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
    },
    txtMinus:{
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(20),
        color: strSecondColor,
        textAlign:'center',
        includeFontPadding:false
    },
    countContainer:{
        flex:1,
        width:24,
        height:24,
        justifyContent:'center',
        alignItems:'center',
    },
    txtCount:{
        width:100,
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(20),
        color: strSecondColor,
        textAlign:'center',
        includeFontPadding:false
    },
    plusContainer:{
        backgroundColor:strSecondColor,
        width:24,
        height:24,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
    },
    txtPlus:{
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(20),
        color: strPrimaryColor,
        textAlign:'center',
        includeFontPadding:false
    },
    DeleteItemContainer:{
        width:widthScale(36),
        height:heightScale(80),
        borderRadius:moderateScale(30),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:strSecondColor
    },
    deleteCartItemImg:{
        width:widthScale(19),
        height:heightScale(22),
    },
    frameContainer:{
        width:widthScale(343),
        height:heightScale(44),
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center',
        paddingLeft:moderateScale(30),
        paddingRight:moderateScale(30),
    },
    txtTitlePrice:{
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(13),
        color: strPrimaryColor
    },
    txtPrice:{
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(13),
        color: 'white'
    },
    checkOutButton: {
        width: widthScale(343),
        height: heightScale(44),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor: strPrimaryColor,
        borderRadius: moderateScale(150),
        flexDirection: 'row',
        marginTop: moderateScale(30),
        marginBottom: moderateScale(20),
    },
    txtCheckOut: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(20),
        color: strSecondColor,
    },
})