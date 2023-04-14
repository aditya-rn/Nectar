import {
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fontFamilies, themeColors} from '../styles/Constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default TextButton = ({
  onpress,
  color,
  marginVertical,
  paddingHorizontal,
  marginHorizontal,
  borderRadius,
  shadow,
  backgroundColor,
  paddingVertical,
  title,
  fontSize,
  letterSpacing,
  nativeID,
  fontFamily,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onpress}
      style={({pressed}) => [
        pressed && {opacity: 0.5},
        {
          marginVertical,
          marginHorizontal,
          borderRadius,
          backgroundColor,
          paddingVertical,
        },
        !!shadow && {
          shadowColor: 'black',
          shadowOffset: {height: 0, width: 0},
          shadowRadius: 15,
          shadowOpacity: 0.2,
          elevation: shadow,
        },
      ]}
      nativeID={nativeID}>
      <Text
        style={[
          styles.btnText,
          {...textStyle},
          {color, fontSize, letterSpacing, fontFamily},
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontFamily: fontFamilies.primaryMedium,
  },
});
