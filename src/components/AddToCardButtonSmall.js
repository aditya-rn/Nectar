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
import CustomComponentBtn from './CustomComponentBtn';
import IconBtn from './IconBtn';
import ImageBtn from './ImageBtn';
export default AddToCardButtonSmall = ({onpress}) => {
  return (
    <ImageBtn
      backgroundColor={themeColors.primaryGreen}
      image={require('../assets/Images/AddToCart.png')}
      width={hp('2%')}
      height={hp('2%')}
      borderRadius={15}
      paddingVertical={hp('1.5%')}
      paddingHorizontal={hp('1.5%')}
      onpress={onpress}
    />
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    height: hp('5%'),
    width: hp('5%'),
    backgroundColor: themeColors.primaryGreen,
    borderRadius: 17,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('1.5%'),
  },
  addBtnLogo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
