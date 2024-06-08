import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { images } from "../Content/resources";
import { moderateScale, widthScale, heightScale } from "../styles/responsive";
import { useNavigation } from "@react-navigation/native";
export function ArrowBack() {
    const { goBack } = useNavigation();
    return (
            <View style={Styles.backArrowContainer}>
                <TouchableWithoutFeedback onPress={goBack}>
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