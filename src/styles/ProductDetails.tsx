import { StyleSheet } from "react-native";
import { heightScale, mbdlScreenHeight, mdblBAR_HEIGHT, moderateScale, strINTER_MEDIUM500_Font, strINTER_SEMIBOLD600_Font, strPrimaryColor, strSecondColor, widthScale } from "./responsive";


export const Styles = StyleSheet.create({
    wall: {
        height: mbdlScreenHeight + mdblBAR_HEIGHT,
        backgroundColor: strSecondColor,
    },
    wallCoffeeImage1: {
        position: 'absolute',
        top: '70%',
        right: 0,
        width: widthScale(55),
        height: heightScale(65),
    },
    wallCoffeeImage2: {
        position: 'absolute',
        top: '43%',
        left: 0,
        width: widthScale(38.87),
        height: heightScale(44.54)
    },
    arrowBackIcon: {
        width: widthScale(24),
        height: heightScale(24),
    },
    favouriteListButton: {
        width: widthScale(32),
        height: heightScale(32),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: moderateScale(15),
        paddingRight: moderateScale(15),
        paddingBottom: moderateScale(10),
        paddingTop: mdblBAR_HEIGHT 
    },
    carouselContainer: {
        justifyContent: 'center', alignItems: 'center'
    },
    contentContainer: {
        marginLeft: moderateScale(20),
        marginRight: moderateScale(20),
    },
    NameAndPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtTitles: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(16),
        color: strPrimaryColor
    },
    txtProductPrice: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(20),
        color: 'white'
    },
    rating: {
        alignItems: 'flex-start',
    },
    ProductDesContainer: {
        width: widthScale(343),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
    },
    txtproductDes: {
        minHeight: heightScale(70),
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(14),
        color: 'white'
    },
    productSizeContainer: {
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
    },
    productSizeBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: widthScale(168),
        marginTop: moderateScale(10),
    },
    productSizeBtn: {
        width: widthScale(30),
        height: heightScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: strPrimaryColor,
        borderRadius: moderateScale(5)
    },
    txtProductSize: {
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(14),
        color: strPrimaryColor
    },
    productSizeBtnSelected: {
        width: widthScale(30),
        height: heightScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(5),
        backgroundColor: strPrimaryColor
    },
    txtProductSizeSelected: {
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(14),
        color: strSecondColor
    },
    productCountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:moderateScale(10),
        marginBottom:moderateScale(10)
    },
    txtProductCountTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtProductNameCount: {
        width: widthScale(150),
        flexWrap:'wrap',
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(14),
        color: '#CEBBAD',
    },
    productCountBtnContainer: {
        width: widthScale(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    plusContainer:{
        width:24,
        height:24,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:strPrimaryColor,
        // margin:5
    },
    txtProductCountBtn: {
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(20),
        color: strPrimaryColor,
        includeFontPadding:false,
        textAlign:'center'
    },
    productCount: {
        width: widthScale(24),
        height: heightScale(25),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: strPrimaryColor,
        borderRadius: moderateScale(5)
    },
    txtProductCount: {
        fontFamily: strINTER_MEDIUM500_Font,
        fontSize: moderateScale(13),
        color: strSecondColor
    },
    addToCartButton: {
        width: widthScale(343),
        height: heightScale(44),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor: strPrimaryColor,
        borderRadius: moderateScale(150),
        flexDirection: 'row',
        marginTop: moderateScale(30),
    },
    txtAddToCart: {
        fontFamily: strINTER_SEMIBOLD600_Font,
        fontSize: moderateScale(20),
        color: strSecondColor,
        marginRight: moderateScale(10)
    },
    cartIcon: {
        width: widthScale(20),
        height: heightScale(20)
    }

})