import { StyleSheet } from "react-native";
import { mbdlScreenHeight, mdblBAR_HEIGHT, mdblScreenWidth, moderateScale, strSecondColor, widthScale } from "./responsive";
import { Styles as styleHeader } from '../styles/Header';

export const Styles = StyleSheet.create({
    wall:{
        backgroundColor:strSecondColor,
    },
    mainContainer:{
        backgroundColor:strSecondColor,
        height: mbdlScreenHeight - styleHeader.mainContainer.height - mdblBAR_HEIGHT
    },
    productContainer:{
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
        margin:moderateScale(15)
    },
});   