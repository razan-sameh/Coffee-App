import {StyleSheet} from 'react-native';
import {
  mbdlScreenHeight,
  mdblBAR_HEIGHT,
  strSecondColor,
  moderateScale,
  widthScale,
  heightScale,
  strINTER_SEMIBOLD600_Font,
  strPrimaryColor,
  strTextColor,
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
  card: {
    backgroundColor: strPrimaryColor,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: strPrimaryColor,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  productTitle: {
    fontSize: 16,
    fontFamily: strINTER_SEMIBOLD600_Font,
    color: strSecondColor,
  },
  productPrice: {
    fontSize: 15,
    fontFamily: strINTER_SEMIBOLD600_Font,
    color: strTextColor,
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: strINTER_SEMIBOLD600_Font,
    color: strSecondColor,
    marginTop: 12,
    marginBottom: 6,
  },
  btn: {
    backgroundColor: strPrimaryColor,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: strSecondColor,
    fontSize: 16,
    fontFamily: strINTER_SEMIBOLD600_Font,
  },
});
