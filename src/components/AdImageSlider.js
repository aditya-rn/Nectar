import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import {themeColors} from '../styles/Constants.js';
export default AdImageSlider = () => {
  return (
    <View style={styles.page}>
      <Swiper
        autoplay={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}>
        <Image
          source={require('../assets/Images/Posters/banner.jpg')}
          style={styles.adImage}
          resizeMode="contain"
          borderRadius={15}
        />
        <Image
          source={require('../assets/Images/Posters/banner.jpg')}
          style={styles.adImage}
          resizeMode="contain"
          borderRadius={15}
        />
        <Image
          source={require('../assets/Images/Posters/banner.jpg')}
          style={styles.adImage}
          resizeMode="contain"
          borderRadius={15}
        />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // backgroundColor: 'green',
    borderRadius: 15,
    overflow: 'hidden',
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  dotStyle: {
    backgroundColor: themeColors.primaryGray,
    // paddingHorizontal: wp('2%'),
    // paddingVertical: hp('0.01%'),
    marginBottom: hp('-3%'),
    height: hp('0.6%'),
    width: hp('0.6%'),
  },
  activeDotStyle: {
    backgroundColor: themeColors.primaryGreen,
    // paddingVertical: hp('0.01%'),
    marginBottom: hp('-3%'),
    height: hp('0.6%'),
    width: hp('1.8%'),
  },
});
