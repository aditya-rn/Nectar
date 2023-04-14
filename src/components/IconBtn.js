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
export default IconBtn = ({
  name,
  size,
  onpress,
  color,
  marginVertical,
  paddingVertical,
  paddingHorizontal,
  marginHorizontal,
  borderRadius,
  shadow,
  backgroundColor,
  borderColor,
  borderWidth,
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
          elevation: shadow,
          shadowColor: 'black',
          shadowOffset: {height: 0, width: 0},
          shadowRadius: 15,
          shadowOpacity: 0.2,
          backgroundColor,
          paddingVertical,
          paddingHorizontal,
          borderColor,
          borderWidth,
        },
      ]}>
      <Icon name={name} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
