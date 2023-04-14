import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {figmaParameters, fontFamilies, themeColors} from '../styles/Constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default ButtonWithIcon = ({
  isInvert = false,
  title,
  onpress,
  backgroundColor,
  iconPath,
}) => {
  return (
    <Pressable
      onPress={onpress}
      style={({pressed}) => [
        styles.mainDiv,
        pressed && {
          opacity: 0.5,
        },
        backgroundColor && {
          backgroundColor: backgroundColor,
        },
      ]}>
      <Image source={iconPath} style={styles.iconStyle} resizeMode="contain" />
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    alignSelf: 'center',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    borderRadius: 17,
    overflow: 'hidden',
    height: hp('8%'),
    width: wp('85%'),
    backgroundColor: themeColors.primaryGreen,
    flexDirection: 'row',
  },
  iconStyle: {
    // backgroundColor: 'red',
    height: hp('3%'),
    width: hp('3%'),
    marginHorizontal: wp('8%'),
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: fontFamilies.primarySemiBold,
    // backgroundColor: themeColors.primaryGreen,
    // flex: 1,
    borderRadius: 17,
    textAlign: 'center',
    textTransform: 'capitalize',
    textAlignVertical: 'center',
  },
});
