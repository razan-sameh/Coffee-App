import { Dimensions, NativeModules, StatusBar } from "react-native";

export const { width: mdblScreenWidth, height: mbdlScreenHeight } = Dimensions.get('window');
const mdblWIDTH_XD = 375;
const mdblHEIGHT_XD = 812;
const {StatusBarManager} = NativeModules;

export const mdblBAR_HEIGHT = StatusBarManager.HEIGHT;

export const widthScale = (size : number) => (mdblScreenWidth / mdblWIDTH_XD) * size;
export const heightScale = (size : number) => (mbdlScreenHeight / mdblHEIGHT_XD) * size;
export const moderateScale = (size : number, factor = 0.5) => size + (widthScale(size) - size) * factor;

export const strINTER_BLACK900_Font = 'Inter-Black'
export const strINTER_BOLD700_Font = 'Inter-Bold'
export const strINTER_EXTRABOLD800_Font = 'Inter-ExtraBold'
export const strINTER_EXTRALIGHT200_Font = 'Inter-ExtraLight'
export const strINTER_LIGHT300_Font = 'Inter-Light'
export const strINTER_MEDIUM500_Font = 'Inter-Medium'
export const strINTER_REGULAR400_Font = 'Inter-Regular'
export const strINTER_SEMIBOLD600_Font = 'Inter-SemiBold'
export const strINTER_THIN100_Font = 'Inter-Thin'

export const strSecondColor = '#251919'
export const strPrimaryColor= '#C08F54'
export const strInpitBtnColor= '#F0F0F2'
export const strInpitColor= '#A19D9D'
export const strCatColor = '#CEBBAD'
export const strTextColor = '#F0F0F2'
