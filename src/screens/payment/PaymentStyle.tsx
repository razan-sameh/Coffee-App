import {StyleSheet} from 'react-native';
import {
  moderateScale,
  strSecondColor,
  mbdlScreenHeight,
  mdblBAR_HEIGHT,
  strINTER_SEMIBOLD600_Font,
  strPrimaryColor,
  heightScale,
  widthScale,
  mdblScreenWidth,
  strWhiteColor,
} from '../../styles/responsive';

export const Styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(16),
    paddingTop: mdblBAR_HEIGHT,
    backgroundColor: strSecondColor,
    height: mbdlScreenHeight + mdblBAR_HEIGHT,
  },
  backArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  txtTitle: {
    fontFamily: strINTER_SEMIBOLD600_Font,
    fontSize: moderateScale(24),
    color: strPrimaryColor,
    textAlign: 'right',
    marginLeft: mdblScreenWidth / 5,
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
    top: '50%',
    left: -17,
  },
  wallCoffeeImage2: {
    width: widthScale(58),
    height: heightScale(58),
    position: 'absolute',
    top: '75%',
    right: -5,
  },
  btnSubmitContainer: {
    position: 'absolute',
    width: widthScale(343),
    height: heightScale(44),
    bottom: 20,
    alignSelf: 'center',
    borderRadius: moderateScale(150),
    backgroundColor: strPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSubmitText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  cardInputContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  cardRowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  cardInputHalf: {
    flex: 0.48, // Takes up slightly less than half to allow for spacing
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: strPrimaryColor,
  },
  cardInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  btnSubmitDisabled: {
    opacity: 0.6,
  },
  // For Option 2 - Styled CardField
  cardFieldContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  cardFieldInput: {
    height: 50,
    marginTop: 5,
  },
  summaryContainer: {
    backgroundColor: strPrimaryColor,
    borderRadius: 10,
    padding: 16,
    marginVertical: 20,
    elevation: 3,
  },
  summaryTitle: {
    color: strSecondColor,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  itemName: {
    color: strSecondColor,
    fontSize: 14,
  },
  itemPrice: {
    color: strSecondColor,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalLabel: {
    color: strSecondColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalValue: {
    color: strSecondColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)', // optional
  },
  paymentTypeContainer: {
    marginTop: 20,
  },
  radioGroup: {
    flexDirection: 'column',
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: strWhiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: strWhiteColor,
  },

  radioLabel: {
    fontSize: 16,
    color: strWhiteColor,
  },
});
