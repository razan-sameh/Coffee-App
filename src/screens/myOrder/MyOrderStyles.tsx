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
  strInpitColor,
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
  container: {
    flex: 1,
    paddingTop: heightScale(10),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: strInpitColor,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: strPrimaryColor,
  },
  tabText: {
    fontSize: 16,
    color: strInpitColor,
  },
  activeTabText: {
    color: strPrimaryColor,
    fontWeight: '600',
  },
  card: {
    backgroundColor: strPrimaryColor,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: strPrimaryColor,
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: strSecondColor,
  },
  date: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: strTextColor,
  },
  items: {
    marginTop: 6,
    fontSize: 14,
    color: strSecondColor,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: strSecondColor,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  viewButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: strSecondColor,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  viewText: {
    color: strSecondColor,
    fontWeight: '600',
  },
  traceButton: {
    flex: 1,
    backgroundColor: strSecondColor,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  traceText: {
    color: strPrimaryColor,
    fontWeight: '600',
  },
});
