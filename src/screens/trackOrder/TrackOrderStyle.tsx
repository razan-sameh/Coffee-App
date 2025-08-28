import {StyleSheet} from 'react-native';
import {
  widthScale,
  heightScale,
  mbdlScreenHeight,
  mdblBAR_HEIGHT,
  strSecondColor,
  strPrimaryColor,
} from '../../styles/responsive';

export const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: strSecondColor,
    height: mbdlScreenHeight + mdblBAR_HEIGHT,
  },
  wallCoffeeImage1: {
    width: widthScale(50),
    height: heightScale(50),
    position: 'absolute',
    top: 0,
    right: -7,
  },
  wallCoffeeImage2: {
    width: widthScale(58),
    height: heightScale(66),
    position: 'absolute',
    top: '70%',
    right: -5,
  },
  orderContainer: {
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryTime: {
    color: strPrimaryColor,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  statusText: {
    color: 'white',
    marginBottom: 12,
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepsIcon: {
    width: 24,
    height: 24,
  },
  dots: {
    color: strPrimaryColor,
  },
  courierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: strPrimaryColor,
    borderRadius: 12,
    padding: 12,
    margin: 16,
  },
  courierIcon: {
    width: 30,
    height: 30,
  },
  courierImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  courierName: {
    color: 'black',
    fontWeight: 'bold',
  },
  courierRole: {
    color: 'black',
  },
  iconBtn: {
    marginLeft: 12,
  },
});
