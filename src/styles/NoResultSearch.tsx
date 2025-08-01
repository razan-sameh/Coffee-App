import {StyleSheet} from 'react-native';
import {
  heightScale,
  mbdlScreenHeight,
  moderateScale,
  strINTER_MEDIUM500_Font,
  strINTER_SEMIBOLD600_Font,
  strPrimaryColor,
  strSecondColor,
  widthScale,
} from './responsive';

export const Styles = StyleSheet.create({
  wall: {
    width: widthScale(375),
    backgroundColor: strSecondColor,
    height: mbdlScreenHeight,
  },
  backArrowContainer: {
    margin: moderateScale(10),
  },
  arrowBackIcon: {
    width: widthScale(24),
    height: heightScale(24),
  },
  srchIconContainer: {
    padding: moderateScale(20),
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultSearchIcon: {
    width: widthScale(128.91),
    height: heightScale(128.91),
  },
  contantContainer: {
    height: '100%',
    alignItems: 'center',
  },
  txtTitle: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    fontSize: moderateScale(24),
    color: strPrimaryColor,
  },
  txtParagraph: {
    fontFamily: strINTER_MEDIUM500_Font,
    fontSize: moderateScale(16),
    color: 'white',
    textAlign: 'center',
  },
});
