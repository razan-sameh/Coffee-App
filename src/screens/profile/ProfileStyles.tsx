import {StyleSheet} from 'react-native';
import {
  moderateScale,
  strSecondColor,
  mbdlScreenHeight,
  mdblBAR_HEIGHT,
  heightScale,
  widthScale,
  mdblScreenWidth,
  strPrimaryColor,
} from '../../styles/responsive';

export const Styles = StyleSheet.create({
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
    width: widthScale(90),
    height: heightScale(90),
    position: 'absolute',
    top: '10%',
    left: -17,
  },
  wallCoffeeImage2: {
    width: widthScale(58),
    height: heightScale(58),
    position: 'absolute',
    top: '80%',
    right: -5,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: strPrimaryColor,
  },
  editIcon: {
    position: 'absolute',
    bottom: 40,
    right: widthScale(110), // adjust based on image size
    backgroundColor: '#caa472',
    padding: 5,
    borderRadius: 15,
  },
  userName: {
    marginTop: 10,
    fontSize: moderateScale(18),
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  frameContainer: {
    width: widthScale(343),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  optionRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 12,
  },
  optionLabel: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 14,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: strPrimaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
