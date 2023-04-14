import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {figmaParameters, fontFamilies, themeColors} from '../styles/Constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default SimpleBtn = ({
  isInvert = false,
  title,
  onpress,
  rightText = '',
  boxStyle,
  btnWidth = wp('85%'),
}) => {
  return (
    <Pressable
      onPress={onpress}
      style={({pressed}) => [
        styles.mainDiv,
        {...boxStyle},
        pressed && {
          opacity: 0.5,
        },
        {width: btnWidth},
      ]}>
      <Text style={styles.buttonText}>{title}</Text>
      {!!rightText && <Text style={styles.rightText}>{rightText}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    overflow: 'hidden',
    height: hp('8%'),
    backgroundColor: themeColors.primaryGreen,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: fontFamilies.primarySemiBold,
    // backgroundColor: themeColors.primaryGreen,
    // flex: 1,
    borderRadius: 17,
    textTransform: 'capitalize',
    textAlign: 'center',
    // textAlignVertical: 'center',
  },
  rightText: {
    backgroundColor: themeColors.primaryGreenLight,
    color: 'white',
    position: 'absolute',
    right: wp('5%'),
    paddingVertical: hp('0.3%'),
    paddingHorizontal: wp('1%'),
    borderRadius: 5,
    overflow: 'hidden',
    fontFamily: fontFamilies.primarySemiBold,
    letterSpacing: 0.2,
    fontSize: 14,
  },
});
