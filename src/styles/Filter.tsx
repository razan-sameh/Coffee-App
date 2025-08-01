import {StyleSheet} from 'react-native';
import {
  heightScale,
  mbdlScreenHeight,
  mdblBAR_HEIGHT,
  moderateScale,
  strCatColor,
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
    height: mbdlScreenHeight + mdblBAR_HEIGHT,
  },
  backArrowContainer: {
    marginTop: mdblBAR_HEIGHT,
    margin: moderateScale(10),
  },
  headerContainer: {
    height: heightScale(40),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  txtTitle: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    fontSize: moderateScale(20),
    color: strPrimaryColor,
  },
  mainContainer: {
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    height: mbdlScreenHeight - 40 + 24, //btnback + header
  },
  rangeContainer: {
    width: '100%',
    height: heightScale(120),
  },
  slider: {
    width: '100%',
    height: heightScale(11),
    alignSelf: 'center',
  },
  txtRangeTitle: {
    height: heightScale(40),
    fontFamily: strINTER_MEDIUM500_Font,
    fontSize: moderateScale(14),
    color: strPrimaryColor,
    marginTop: moderateScale(10),
  },
  dataRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtData: {
    fontFamily: strINTER_MEDIUM500_Font,
    fontSize: moderateScale(14),
    color: 'white',
    marginBottom: moderateScale(10),
  },
  catContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  catItem: {
    width: widthScale(100),
    height: heightScale(48),
    borderRadius: moderateScale(12),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    marginRight: moderateScale(10),
    padding: moderateScale(5),
    borderColor: strPrimaryColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtCat: {
    color: strCatColor,
    fontFamily: strINTER_MEDIUM500_Font,
    fontSize: moderateScale(13),
  },
  selectedCatItem: {
    backgroundColor: strPrimaryColor,
  },
  selectedtextCat: {
    color: strSecondColor,
  },
  applyBtnContainer: {
    flexDirection: 'row',
    width: '100%',
    height: heightScale(70),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
  },
  applyBtn: {
    flex: 1,
    height: heightScale(44),
    backgroundColor: strPrimaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(150),
  },
  txtApply: {
    color: strSecondColor,
    fontFamily: strINTER_MEDIUM500_Font,
    fontSize: moderateScale(20),
  },
});
