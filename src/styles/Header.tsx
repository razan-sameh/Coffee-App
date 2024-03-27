import { StyleSheet } from "react-native";
import { heightScale, mdblBAR_HEIGHT, moderateScale, strINTER_MEDIUM500_Font, strINTER_SEMIBOLD600_Font, strInpitBtnColor, strPrimaryColor, strSecondColor, widthScale } from "./responsive";

export const Styles = StyleSheet.create({
    mainContainer:{
        width:widthScale(375),
        height: heightScale(240) - mdblBAR_HEIGHT,
        paddingLeft:moderateScale(16),
        paddingRight:moderateScale(16),
        paddingTop :moderateScale(40),
        backgroundColor:strSecondColor,
    },
    sideBarImage:{
        width:widthScale(24),
        height: heightScale(24)
    },
    locationContainer:{
        width:widthScale(103.36),
        height: heightScale(24.36),
        flexDirection:'row',
        alignItems:'center',
        marginTop:moderateScale(20)
    },
    listLocationContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:moderateScale(10)
    },
    txtlocation:{
        color:strPrimaryColor,
        marginRight:moderateScale(5),
        fontSize:moderateScale(14),
        fontFamily:strINTER_MEDIUM500_Font
    },
    arrowDownLocation:{
        width:widthScale(13),
        height: heightScale(15)
    },
    locationIcon:{
        width:widthScale(14),
        height: heightScale(20)
    },
    txtuserName:{
        color:strPrimaryColor,
        marginTop:moderateScale(10),
        fontSize:moderateScale(20),
        fontFamily:strINTER_SEMIBOLD600_Font
    },
    searchContainer:{
        width:widthScale(343),
        height: heightScale(44),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:moderateScale(150),
        marginTop:moderateScale(10),
        padding: moderateScale(10),
        backgroundColor: strInpitBtnColor
    },
    srchInputContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    srchInput:{
        width:widthScale(260),
        height: heightScale(44),
        marginLeft:moderateScale(10),
    },
    srchIcon:{
        width:widthScale(24),
        height: heightScale(24),
    }
});   