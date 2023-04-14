import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {countryCodesWithMap} from '../data/Countrycodes';
import {fontFamilies, themeColors} from '../styles/Constants';
import CustomComponentBtn from './CustomComponentBtn';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Ionicons';
export default PickerBar = props => {
  // console.log('props.countrySelected');
  // console.log(props.countrySelected);
  return (
    <>
      {!!props.requireTitle && (
        <Text style={styles.titleStyle}>{props.title}</Text>
      )}
      <Pressable
        onPress={props.onpress}
        style={({pressed}) => [pressed && {opacity: 0.5}]}>
        <View style={styles.mainDiv}>
          <Text style={[styles.inputBar, {color: props.detailColor}]}>
            {props.detail}
          </Text>
          <Icon name="chevron-down" size={25} color={themeColors.primaryGray} />
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    height: hp('6.5%'),
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },
  countryDiv: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  countryCode: {
    color: 'black',
    fontSize: 18,
    fontFamily: fontFamilies.primaryMedium,
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginHorizontal: wp('2%'),
  },
  inputBar: {
    // backgroundColor: 'green',
    flex: 1,
    fontSize: 18,
    fontFamily: fontFamilies.primaryMedium,
    paddingHorizontal: wp('1%'),
  },
  mapImage: {
    // backgroundColor: 'green',
    height: hp('5%'),
    width: wp('8%'),
  },
  titleStyle: {
    fontFamily: fontFamilies.primarySemiBold,
    fontSize: 16,
    color: '#7C7C7C',
    marginHorizontal: wp('1%'),
    marginTop: hp('1.5%'),
    // marginTop: hp('2.5%'),
  },
});
