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
  strINTER_MEDIUM500_Font,
  strINTER_SEMIBOLD600_Font,
  strWhiteColor,
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
  contantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: strINTER_MEDIUM500_Font,
    color: '#ccc',
    marginBottom: 8,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'transparent',
    flex: 1,
  },
  inputAddress: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    color: strWhiteColor,
    flex: 1,
  },
  saveBtn: {
    backgroundColor: strPrimaryColor,
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
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
  txtError: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    fontSize: moderateScale(14),
    color: strPrimaryColor,
  },
});
