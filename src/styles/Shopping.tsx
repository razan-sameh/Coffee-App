import { StyleSheet } from "react-native";
import { heightScale, mbdlScreenHeight, mdblBAR_HEIGHT, mdblScreenWidth, moderateScale, strSecondColor, widthScale } from "./responsive";
import { Styles as styleHeader } from '../styles/Header';

export const Styles = StyleSheet.create({
    wall:{
        backgroundColor:strSecondColor,
    },
    filterContainer:{
        width:'100%',
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:moderateScale(25),
        paddingTop:moderateScale(10),
        paddingBottom:moderateScale(10),
    },
    filterIcon:{
        width:widthScale(22),
        height: heightScale(17)
    },
    mainContainer:{
        backgroundColor:strSecondColor,
        height: mbdlScreenHeight - styleHeader.mainContainer.height - mdblBAR_HEIGHT - 32
    },
    productContainer:{
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
        margin:moderateScale(15)
    },
});   