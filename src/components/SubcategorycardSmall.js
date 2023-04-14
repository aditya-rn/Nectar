import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {fontFamilies, themeColors} from '../styles/Constants';
import AddToCardButtonSmall from './AddToCardButtonSmall';
export default SubcategorycardSmall = ({name, image, cardIndex, length}) => {
  // console.log('length');
  // console.log(length);
  return (
    <View
      style={[
        styles.mainDiv,
        cardIndex == 0 && {marginLeft: wp('5.5%')},
        cardIndex == length - 1 && {marginRight: wp('5.5%')},
      ]}>
      <View
        style={[
          styles.dummyBackDiv,
          {
            backgroundColor:
              parseInt(cardIndex) % 2 == 0
                ? themeColors.subcategoryBacgroundColor
                : themeColors.subcategoryBacgroundColor2,
          },
        ]}></View>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    // backgroundColor: 'red',
    height: hp('12%'),
    marginHorizontal: wp('2%'),
    borderRadius: 18,
    minWidth: wp('60%'),
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: hp('1.5%'),
  },
  dummyBackDiv: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 0.15,
  },
  image: {
    height: hp('9%'),
    width: hp('9%'),
    marginHorizontal: wp('4%'),
  },
  name: {
    fontFamily: fontFamilies.primarySemiBold,
    fontSize: 20,
    marginVertical: hp('1%'),
    color: themeColors.primaryBlack,
  },
});
