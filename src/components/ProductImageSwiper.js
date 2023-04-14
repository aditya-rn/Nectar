import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import {themeColors} from '../styles/Constants.js';
export default ProductImageSwiper = ({imagesArray}) => {
  return (
    <View style={styles.page}>
      <Swiper
        autoplay={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}>
        {imagesArray.map((imageObject, index) => {
          const [imageLoading, setImageLoading] = useState(true);
          return (
            <>
              {imageLoading && (
                <ActivityIndicator
                  size={'large'}
                  style={styles.imageLoader}
                  color={themeColors.primaryGray}
                />
              )}
              <Image
                source={{uri: imageObject}}
                style={styles.productImages}
                resizeMode="contain"
                key={index}
              />
            </>
          );
        })}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: themeColors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImages: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'yellow',
    marginVertical: hp('7%'),
  },
  dotStyle: {
    backgroundColor: themeColors.primaryGray,
    // paddingHorizontal: wp('2%'),
    // paddingVertical: hp('0.01%'),
    // marginBottom: hp('%'),
    height: hp('0.5%'),
    width: hp('0.5%'),
  },
  activeDotStyle: {
    backgroundColor: themeColors.primaryGreen,
    // paddingVertical: hp('0.01%'),
    // marginBottom: hp('1%'),
    height: hp('0.5%'),
    width: hp('1.8%'),
  },
  imageLoader: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    // zIndex: 10,
  },
});
