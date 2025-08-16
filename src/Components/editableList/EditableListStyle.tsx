import {StyleSheet} from 'react-native';
import {
  strSecondColor,
  strPrimaryColor,
  heightScale,
  mbdlScreenHeight,
  mdblBAR_HEIGHT,
  mdblScreenWidth,
  moderateScale,
  widthScale,
} from '../../styles/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: strSecondColor,
    padding: 16,
  },
  mainContainer: {
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(16),
    backgroundColor: strSecondColor,
    height: mbdlScreenHeight + mdblBAR_HEIGHT,
  },
  wave: {
    width: mdblScreenWidth,
    height: heightScale(200),
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  wallCoffeeImage1: {
    width: widthScale(60),
    height: heightScale(60),
    position: 'absolute',
    top: '2%',
    right: -17,
  },
  wallCoffeeImage2: {
    width: widthScale(60),
    height: heightScale(60),
    position: 'absolute',
    top: '80%',
    right: -5,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: strPrimaryColor,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: strPrimaryColor,
    paddingVertical: 12,
    borderRadius: 8,
    // marginTop: 20,
    marginBottom: 200,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});
