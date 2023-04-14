import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {
  Alert,
  FlatList,
  Image,
  Modal,
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
import IconBtn from './IconBtn';

export const CheckOutDetailsItemBox = ({
  detailName,
  detailValue,
  rightIcon = 'chevron-forward',
  isHeading = false,
  onIconPress,
}) => {
  return (
    <View style={styles.mainDiv}>
      <Text style={[styles.detailHeading, isHeading && styles.heading]}>
        {detailName}
      </Text>
      <Text style={styles.detailValue}>{detailValue}</Text>
      <IconBtn
        name={rightIcon}
        size={isHeading ? 30 : 25}
        color={themeColors.primaryBlack}
        onpress={onIconPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    // backgroundColor: 'red',
    paddingVertical: hp('1.9%'),
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    color: themeColors.primaryBlack,
    paddingVertical: hp('1.7%'),
  },
  detailHeading: {
    // backgroundColor: 'green',
    flex: 1,
    color: themeColors.primaryGray,
    fontSize: 18,
    fontFamily: fontFamilies.primarySemiBold,
    textTransform: 'capitalize',
  },
  detailValue: {
    color: themeColors.primaryBlack,
    fontFamily: fontFamilies.primarySemiBold,
    fontSize: 16,
    paddingHorizontal: wp('1%'),
  },
});
