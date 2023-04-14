import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Keyboard,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {fontFamilies, themeColors} from '../styles/Constants';
import IconBtn from './IconBtn';
export default SearchBarBox = ({
  searchProduct,
  cancelSearchByBtn,
  searchText,
}) => {
  return (
    <View style={styles.mainDiv}>
      <Image
        source={require('../assets/Images/Search.png')}
        style={styles.searchLogo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.searchText}
        placeholder={'Search Store'}
        placeholderTextColor={themeColors.primaryGray}
        onChangeText={searchProduct}
        value={searchText}
      />
      <IconBtn
        name={'close'}
        size={25}
        color={themeColors.primaryGray}
        onpress={cancelSearchByBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: themeColors.lightGray,
    flexDirection: 'row',
    width: wp('90%'),
    alignSelf: 'center',
    borderRadius: 15,
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    paddingVertical: hp('1%'),
    // backgroundColor: 'red',
  },
  searchLogo: {
    height: hp('2.25%'),
    width: hp('2%'),
    marginRight: wp('2%'),
  },
  searchText: {
    fontSize: 14,
    fontFamily: fontFamilies.primaryMedium,
    color: themeColors.primaryBlack,
    // backgroundColor: 'blue',
    paddingVertical: hp('1%'),
    flex: 1,
  },
});
