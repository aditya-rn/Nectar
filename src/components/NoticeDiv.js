import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default NoticeDiv = ({
  fontSize,
  style,
  fontColor,
  backgroundColor,
  fontFamily,
  paddingVertical,
  paddingHorizontal,
  text,
}) => {
  return (
    <View
      style={[
        styles.mainDiv,
        {...style},
        {paddingVertical, paddingHorizontal, backgroundColor},
      ]}>
      <Text style={[styles.textDiv, {fontSize, fontFamily, color: fontColor}]}>
        {text}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {},
  textDiv: {},
});
