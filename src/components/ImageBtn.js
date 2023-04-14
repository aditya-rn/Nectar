import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default ImageBtn = ({
  image,
  onpress,
  height,
  width,
  backgroundColor,
  borderRadius,
  paddingVertical,
  paddingHorizontal,
  borderColor,
  borderWidth,
}) => {
  return (
    <Pressable
      onPress={onpress}
      style={({pressed}) => [
        pressed && {opacity: 0.5},
        {
          backgroundColor,
          borderRadius,
          borderWidth,
          borderColor,
        },
      ]}>
      <Image
        resizeMode="contain"
        source={image}
        style={[
          {
            backgroundColor,
            height,
            width,
            marginVertical: paddingVertical,
            marginHorizontal: paddingHorizontal,
          },
        ]}
      />
    </Pressable>
  );
};
