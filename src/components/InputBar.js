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
import {fontFamilies} from '../styles/Constants';
import CustomComponentBtn from './CustomComponentBtn';
import CountryPicker from 'react-native-country-picker-modal';
export default InputBar = props => {
  // console.log('props.countrySelected');
  // console.log(props.countrySelected);
  return (
    <>
      {!!props.requireTitle && (
        <Text style={styles.titleStyle}>{props.title}</Text>
      )}
      <View style={styles.mainDiv}>
        {!!props.countrySelected && (
          <Pressable
            onPress={props.onpress}
            style={({pressed}) => [pressed && {opacity: 0.5}]}>
            <View style={styles.countryDiv}>
              <CountryPicker
                withFlag={true}
                countryCode={props.countrySelected.cca2}
                onSelect={props.onSelect}
                visible={props.showCountryListModal}
                onClose={props.onClose}
              />
              <Text style={styles.countryCode}>
                +
                {!!props.countrySelected.callingCode[0]
                  ? props.countrySelected.callingCode[0]
                  : '00'}
              </Text>
            </View>
          </Pressable>
        )}
        <TextInput
          style={[
            styles.inputBar,
            !!props.isSpaceRequired && {letterSpacing: wp('2%')},
          ]}
          placeholderTextColor={'#7C7C7C'}
          maxLength={!!props.maxLength ? props.maxLength : 10}
          {...props}
        />
      </View>
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
    color: 'black',
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
    // marginTop: hp('2.5%'),
  },
});
