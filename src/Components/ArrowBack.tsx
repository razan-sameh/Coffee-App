import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { images } from "../Content/resources";
import { moderateScale, widthScale, heightScale } from "../styles/responsive";

export function ArrowBack() {
    return (
            <View style={Styles.backArrowContainer}>
                <TouchableWithoutFeedback>
                <FastImage style={Styles.arrowBackIcon} resizeMode='contain' source={images.ArrowBack}/>
                </TouchableWithoutFeedback>
            </View>
            
    );
}

export const Styles = StyleSheet.create({
    backArrowContainer:{
        margin:moderateScale(10),
        marginLeft:moderateScale(0),
    },
    arrowBackIcon:{
        width:widthScale(24),
        height:heightScale(24),
    },
});