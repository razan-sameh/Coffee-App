import {StyleSheet} from 'react-native';
import {
  strINTER_SEMIBOLD600_Font,
  moderateScale,
  strPrimaryColor,
  mbdlScreenHeight,
  mdblBAR_HEIGHT,
  strSecondColor,
  strTextColor,
  strINTER_BOLD700_Font,
  strINTER_MEDIUM500_Font,
} from '../../styles/responsive';

export const Styles = StyleSheet.create({
  wall: {
    height: mbdlScreenHeight + mdblBAR_HEIGHT,
    backgroundColor: strSecondColor,
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  txtTitle: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    fontSize: moderateScale(24),
    color: strPrimaryColor,
    textAlign: 'center',
  },
  section: {
    paddingVertical: 10,
  },
  seperator: {
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontFamily: strINTER_SEMIBOLD600_Font,
    marginBottom: 5,
    color: strPrimaryColor,
  },
  label: {
    fontSize: moderateScale(15),
    color: strPrimaryColor,
    marginTop: 5,
  },
  value: {
    fontSize: moderateScale(14),
    color: strTextColor,
    textAlign: 'left',
  },
  statusBtn: {
    backgroundColor: '#F9C74F',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  statusTxt: {
    fontSize: moderateScale(14),
    fontFamily: strINTER_MEDIUM500_Font,
    color: strSecondColor,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  itemName: {
    fontSize: moderateScale(15),
    fontFamily: strINTER_SEMIBOLD600_Font,
    color: strPrimaryColor,
  },
  itemSub: {
    fontSize: moderateScale(12),
    color: strTextColor,
  },
  itemQty: {
    fontSize: moderateScale(12),
    color: strTextColor,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: strINTER_SEMIBOLD600_Font,
    color: strTextColor,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalTxt: {
    fontSize: 16,
    fontFamily: strINTER_BOLD700_Font,
    color: strPrimaryColor,
  },
  footer: {
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerBtn: {
    width: '50%',
    backgroundColor: strPrimaryColor,
    padding: 12,
    borderRadius: 8,
  },
  footerBtnTxt: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    color: strSecondColor,
    textAlign: 'center',
  },
});
