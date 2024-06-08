import { StyleSheet } from "react-native";
import { heightScale, mbdlScreenHeight, mdblBAR_HEIGHT, mdblScreenWidth, moderateScale, strINTER_SEMIBOLD600_Font, strPrimaryColor, strSecondColor, widthScale } from "./responsive";
import { Styles as styleHeader } from '../styles/Header';

export const Styles = StyleSheet.create({
    wall:{
        backgroundColor:strSecondColor,
    },
    backArrowContainer: {
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft: moderateScale(15),
        paddingRight: moderateScale(15),
        paddingTop: moderateScale(10),
    },
    filterIcon:{
        width:widthScale(22),
        height: heightScale(17)
    },
    mainContainer:{
        backgroundColor:strSecondColor,
        height: mbdlScreenHeight 
    },
    productContainer:{
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
        margin:moderateScale(15)
    },
    noDataContainer:{
        height:'80%',
        width:'70%',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    noDataText:{
        fontFamily:strINTER_SEMIBOLD600_Font,
        fontSize:moderateScale(24),
        color:strPrimaryColor,
        textAlign:'center'
    }
});   