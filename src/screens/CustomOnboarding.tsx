import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import {images} from '../Content/resources';
import FastImage from 'react-native-fast-image';
import {
  widthScale,
  heightScale,
  moderateScale,
  strSecondColor,
  strPrimaryColor,
  strINTER_SEMIBOLD600_Font,
  strINTER_MEDIUM500_Font,
} from '../styles/responsive';
import Onboarding from 'react-native-onboarding-swiper';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const CustomOnboarding = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const Dots = ({selected}: any) => {
    let backgroundColor;

    backgroundColor = selected ? strPrimaryColor : 'transparent';

    return (
      <View style={Styles.dotsContainer}>
        <View
          style={[
            Styles.dots,
            {
              backgroundColor,
            },
          ]}
        />
      </View>
    );
  };
  const Skip = ({...props}) => (
    <TouchableWithoutFeedback {...props}>
      <View style={Styles.skipBtnContainer}>
        <Text style={Styles.txtSkipButton}>Skip</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const Next = ({...props}) => (
    <TouchableWithoutFeedback {...props}>
      <View style={Styles.nextBtnContainer}>
        <Text style={Styles.txtNextButton}>Next</Text>
      </View>
    </TouchableWithoutFeedback>
  );
  const Done = ({...props}) => (
    <TouchableWithoutFeedback {...props}>
      <View style={Styles.nextBtnContainer}>
        <Text style={Styles.txtNextButton}>Start</Text>
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <View style={Styles.mainContainer}>
      <FastImage
        resizeMode="contain"
        style={Styles.wallCoffeeImage1}
        source={images.OnboardingWallIcon1}
      />
      <FastImage
        resizeMode="contain"
        style={Styles.wallCoffeeImage2}
        source={images.OnboardingWallIcon2}
      />
      <Onboarding
        imageContainerStyles={Styles.imageContainer}
        bottomBarHighlight={false}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.navigate('Login')}
        onDone={() => navigation.navigate('Login')}
        bottomBarHeight={100}
        titleStyles={Styles.title}
        subTitleStyles={Styles.subTitle}
        pages={[
          {
            backgroundColor: strSecondColor,
            image: (
              <FastImage style={Styles.image} source={images.Onboarding1} />
            ),
            title: 'Title',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: strSecondColor,
            image: (
              <FastImage style={Styles.image} source={images.Onboarding2} />
            ),
            title: 'Title',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: strSecondColor,
            image: (
              <FastImage style={Styles.image} source={images.Onboarding3} />
            ),
            title: 'Title',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </View>
  );
};
export default CustomOnboarding;

export const Styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    height: heightScale(317),
    position: 'absolute',
    top: 0,
    zIndex: 500,
  },
  image: {
    width: widthScale(375),
    height: heightScale(317),
    borderBottomRightRadius: moderateScale(159),
  },
  wallCoffeeImage1: {
    position: 'absolute',
    top: '40%',
    left: -10,
    width: widthScale(60),
    height: heightScale(60),
    zIndex: 1000,
  },
  wallCoffeeImage2: {
    position: 'absolute',
    top: '80%',
    right: -5,
    width: widthScale(60),
    height: heightScale(60),
    zIndex: 1000,
  },
  dotsContainer: {
    height: heightScale(400),
    zIndex: 1000,
  },
  dots: {
    width: 10,
    height: 10,
    marginHorizontal: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: strPrimaryColor,
  },
  nextBtnContainer: {
    width: widthScale(155),
    height: heightScale(44),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: strPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(20),
    backgroundColor: strPrimaryColor,
  },
  txtNextButton: {
    fontSize: moderateScale(20),
    fontFamily: strINTER_SEMIBOLD600_Font,
    color: strSecondColor,
  },
  skipBtnContainer: {
    width: widthScale(155),
    height: heightScale(44),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: strPrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(20),
  },
  txtSkipButton: {
    fontSize: moderateScale(20),
    fontFamily: strINTER_SEMIBOLD600_Font,
    color: strPrimaryColor,
  },
  title: {
    fontSize: moderateScale(32),
    fontFamily: strINTER_SEMIBOLD600_Font,
    color: strPrimaryColor,
    marginTop: moderateScale(50),
  },
  subTitle: {
    fontSize: moderateScale(16),
    fontFamily: strINTER_MEDIUM500_Font,
    color: 'white',
  },
});
