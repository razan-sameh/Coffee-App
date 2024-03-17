import { StyleSheet } from "react-native";
import { heightScale, mbdlScreenHeight, moderateScale, strINTER_MEDIUM500_Font, strINTER_SEMIBOLD600_Font, strPrimaryColor, strSecondColor, widthScale } from "./responsive";


export const Styles = StyleSheet.create({
    wall: {
        height: mbdlScreenHeight,
        backgroundColor: strSecondColor,
    },
    wallCoffeeImage1: {
        position: 'absolute',
        top: '70%',
        right: 0,
        width:widthScale(55),
        height:heightScale(65),
    },
    wallCoffeeImage2: {
        position: 'absolute',
        top: '41%',
        left: 0,
        width:widthScale(38.87),
        height:heightScale(44.54)
    },
    arrowBackIcon:{
        width:widthScale(24),
        height:heightScale(24),
    },
    wishListButton:{
        width:widthScale(32),
        height:heightScale(32),
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:moderateScale(10)
    },
    carouselContainer:{
        justifyContent: 'center', alignItems: 'center'
    },
    contentContainer:{
        marginLeft:moderateScale(20),
        marginRight:moderateScale(20),
    },
    NameAndPriceContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    txtTitles:{
        fontFamily:strINTER_SEMIBOLD600_Font,
        fontSize:moderateScale(16),
        color:strPrimaryColor
    },
    txtProductPrice:{
        fontFamily:strINTER_SEMIBOLD600_Font,
        fontSize:moderateScale(20),
        color:'white'
    },
    rating:{
        alignItems:'flex-start',
    },
    ProductDesContainer:{
        width:widthScale(343),
        marginTop:moderateScale(10),
        marginBottom:moderateScale(10),
    }, 
    txtproductDes:{
        fontFamily:strINTER_SEMIBOLD600_Font,
        fontSize:moderateScale(14),
        color:'white'
    },
    productSizeContainer:{
        marginTop:moderateScale(10),
        marginBottom:moderateScale(10),
    },
    productSizeBtnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:widthScale(168),
        marginTop:moderateScale(10),
    },
    productSizeBtn:{
        width:widthScale(30),
        height:heightScale(30),
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:strPrimaryColor,
        borderRadius:moderateScale(5)
    },
    productSizeBtnSelected:{
        backgroundColor:strPrimaryColor
    },
    txtProductSize:{
        fontFamily:strINTER_MEDIUM500_Font,
        fontSize:moderateScale(14),
        color:strPrimaryColor
    },
    productCountContainer:{
        width:widthScale(258),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    txtProductCountTitle:{
        flexDirection:'row',
        alignItems:'center'
    },
    txtProductNameCount:{
        fontFamily:strINTER_MEDIUM500_Font,
        fontSize:moderateScale(14),
        color:'#CEBBAD'
    },
    productCountBtnContainer:{
        width:widthScale(69),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    txtProductCountBtn:{
        fontFamily:strINTER_MEDIUM500_Font,
        fontSize:moderateScale(20),
        color:strPrimaryColor
    },
    productCount:{
        width:widthScale(24),
        height:heightScale(25),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:strPrimaryColor,
        borderRadius:moderateScale(5)
    },
    txtProductCount:{
        fontFamily:strINTER_MEDIUM500_Font,
        fontSize:moderateScale(13),
        color:strSecondColor  
    },
    addToCartButton:{
        width:widthScale(343),
        height:heightScale(44),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:strPrimaryColor,
        borderRadius:moderateScale(150),
        flexDirection:'row',
        marginTop:moderateScale(30),
    },
    txtAddToCart:{
        fontFamily:strINTER_SEMIBOLD600_Font,
        fontSize:moderateScale(20),
        color:strSecondColor,
        marginRight:moderateScale(10)
    },
    cartIcon:{
        width:widthScale(20),
        height:heightScale(20)
    }

})