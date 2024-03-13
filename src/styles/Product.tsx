import { StyleSheet } from "react-native";
import { heightScale, moderateScale, strINTER_BOLD700_Font, strINTER_MEDIUM500_Font, strPrimaryColor, strSecondColor, strTextColor, widthScale } from "./responsive";

export const Styles = StyleSheet.create({
    catProductSubContainer:{
        width:widthScale(156),
        height:heightScale(211),
        borderRadius:moderateScale(30),
        marginBottom:moderateScale(20),
        marginRight:moderateScale(10),
        backgroundColor:strPrimaryColor,
        alignItems:'center',
        justifyContent:'center',

    },
    catProductImg:{
        width:widthScale(124),
        height:heightScale(124),
        borderRadius:moderateScale(14)
    },
    wishListImgContainer:{
        width:widthScale(18),
        height:heightScale(18),
        position:'absolute',
        top:0,
        right:0,
        margin:moderateScale(10)
    },
    catProdDetailsContainer:{
        width:widthScale(124),
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    catProdDetailsSubContainer:{
        width:widthScale(83),
        height:heightScale(55),
    },
    txtProdCat:{
        width:widthScale(100),
        height:heightScale(20),
        flexWrap:'nowrap',
        color:strSecondColor,
        fontFamily:strINTER_BOLD700_Font,
        fontSize: moderateScale(14)
    },

    txtProdDesc:{
        width:widthScale(100),
        height:heightScale(20),
        flexWrap:'nowrap',
        color:strTextColor,
        fontFamily:strINTER_MEDIUM500_Font,
        fontSize: moderateScale(12)
    },
    txtProdPrice:{
        color:strSecondColor,
        fontFamily:strINTER_MEDIUM500_Font,
        fontSize: moderateScale(12)
    },
});   