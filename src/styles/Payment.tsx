import {StyleSheet} from 'react-native';
import {
  moderateScale,
  strSecondColor,
  mbdlScreenHeight,
  mdblBAR_HEIGHT,
  strINTER_SEMIBOLD600_Font,
  strPrimaryColor,
  heightScale,
  widthScale,
  strWhiteColor,
  mdblScreenWidth,
  strINTER_MEDIUM500_Font,
} from './responsive';

export const Styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(16),
    paddingTop: mdblBAR_HEIGHT,
    backgroundColor: strSecondColor,
    height: mbdlScreenHeight + mdblBAR_HEIGHT,
  },
  backArrowContainer: {
    // width:mdblScreenWidth /2 ,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  txtTitle: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    fontSize: moderateScale(24),
    color: strPrimaryColor,
    textAlign: 'right',
    marginLeft: mdblScreenWidth / 5,
  },
  wave: {
    width: mdblScreenWidth,
    height: heightScale(200),
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  wallCoffeeImage1: {
    width: widthScale(90),
    height: heightScale(90),
    position: 'absolute',
    top: '55%',
    left: -17,
  },
  wallCoffeeImage2: {
    width: widthScale(58),
    height: heightScale(58),
    position: 'absolute',
    top: '80%',
    right: -5,
  },
});
