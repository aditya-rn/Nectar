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
export default CustomComponentBtn = ({children, onpress}) => {
  return (
    <Pressable
      onPress={onpress}
      style={({pressed}) => [pressed && {opacity: 0.5}, {flex: 1}]}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({});
