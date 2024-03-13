import { StyleSheet } from "react-native";
import { heightScale, mbdlScreenHeight, moderateScale, strCatColor, strINTER_MEDIUM500_Font, strINTER_SEMIBOLD600_Font, strPrimaryColor, strSecondColor, widthScale } from "./responsive";

export const Styles = StyleSheet.create({
    wall: {
        width: widthScale(375),
        backgroundColor: strSecondColor,
        height: mbdlScreenHeight,
    },
    backArrowContainer: {
        width: widthScale(100),
        height: heightScale(40),
        margin: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtTitle: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(24),
        color: strPrimaryColor,
        marginLeft: moderateScale(10)
    },
    priceContainer: {
        width: '100%',
        height: heightScale(120),
    },
    slider: {
        width: '95%',
        height: heightScale(11),
        alignSelf:'center'
    },
    txtSubTitle: {
        height: heightScale(40),
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(20),
        color: strPrimaryColor,
        marginLeft: moderateScale(10)
    },
    priceSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtPriceNumber: {
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(16),
        color: 'white',
        marginLeft: moderateScale(20),
        marginRight: moderateScale(20),
        marginBottom: moderateScale(10),
    },
    catContainer: {
        height: mbdlScreenHeight - heightScale(120 + 40 + 30),
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        padding: moderateScale(10)
    },
    catItem: {
        minWidth: widthScale(100),
        height: heightScale(48),
        borderRadius: moderateScale(12),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
        marginRight: moderateScale(10),
        padding: moderateScale(5),
        borderColor: strPrimaryColor,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtCat: {
        color: strCatColor,
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(13)
    },
    selectedCatItem:{
        backgroundColor:strPrimaryColor
    },
    selectedtextCat:{
        color:strSecondColor
    }
})