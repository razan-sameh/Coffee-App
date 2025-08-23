import {StyleSheet} from 'react-native';
import {
  mbdlScreenHeight,
  mdblBAR_HEIGHT,
  strSecondColor,
  widthScale,
  heightScale,
  moderateScale,
  strINTER_SEMIBOLD600_Font,
  strPrimaryColor,
  strWhiteColor,
} from '../../styles/responsive';

export const Styles = StyleSheet.create({
  wall: {
    height: mbdlScreenHeight + mdblBAR_HEIGHT,
    backgroundColor: strSecondColor,
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  wallCoffeeImage1: {
    position: 'absolute',
    top: mdblBAR_HEIGHT,
    right: 0,
    width: widthScale(53.69),
    height: heightScale(61.52),
  },
  wallCoffeeImage2: {
    position: 'absolute',
    bottom: '10%',
    left: 0,
    width: widthScale(38.87),
    height: heightScale(44.54),
  },
  txtTitle: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    fontSize: moderateScale(24),
    color: strPrimaryColor,
    textAlign: 'center',
  },
  txtInputTitle: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    fontSize: moderateScale(14),
    color: strPrimaryColor,
    marginBottom: moderateScale(10),
    marginTop: moderateScale(20),
  },
  // input: {
  //   width: widthScale(343),
  //   height: heightScale(44),
  //   backgroundColor: strWhiteColor,
  //   borderRadius: moderateScale(20),
  //   borderTopLeftRadius: moderateScale(20),
  //   borderTopRightRadius: moderateScale(20),
  //   marginTop: moderateScale(20),
  // },
  inputWrapper: {
    position: 'relative',
    width: widthScale(343),
    height: heightScale(44),
    marginTop: moderateScale(20),
  },
  input: {
    flex: 1,
    backgroundColor: strWhiteColor,
    borderRadius: moderateScale(20),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(40), // space for icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -11}],
  },

  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  btnSubmitContainer: {
    width: widthScale(343),
    height: heightScale(44),
    marginTop: moderateScale(30),
    borderRadius: moderateScale(150),
    backgroundColor: strPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButtonSubmit: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    fontSize: moderateScale(20),
    color: strSecondColor,
  },
});
