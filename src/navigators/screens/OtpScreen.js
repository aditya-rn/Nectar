import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import IconBtn from '../../components/IconBtn';
import InputBar from '../../components/InputBar';
import LoadingPage from '../../components/LoadingPage';
import TextButton from '../../components/TextButton';
import {UserAuthenticationContext} from '../../data/UserAuthenticationContext';
import {fontFamilies, themeColors} from '../../styles/Constants';
const screen = Dimensions.get('screen');

export default OtpScreen = () => {
  const navigation = useNavigation();
  const Userauthenticationcontext = useContext(UserAuthenticationContext);

  const [otp, setOtp] = useState('');
  const onBackPressHandler = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const submitOtp = async () => {
    if (!otp || otp.length < 6) {
      Alert.alert('Oops', 'Enter valid otp !!');
      return;
    }
    let isVerified = await Userauthenticationcontext.verifyOtp(otp);
    if (isVerified) {
      navigation.reset({index: 0, routes: [{name: 'BottomTabNavigator'}]});
    }
  };

  return (
    <View style={styles.mainDiv}>
      {Userauthenticationcontext.isLoading && (
        <Modal transparent visible animationType="fade">
          <LoadingPage loadingText="Please wait .." />
        </Modal>
      )}
      {/* {!!Userauthenticationcontext.isLoading && (
        <Modal
          transparent
          visible={Userauthenticationcontext.isLoading}
          animationType="fade">
          <LoadingPage />
        </Modal>
      )} */}
      <Image
        source={require('../../assets/Images/LoginScreenPoster.png')}
        style={[styles.posterImage]}
        resizeMode="contain"
        blurRadius={100}
      />

      <SafeAreaView
        style={[
          styles.page,
          Platform.OS == 'android' && {paddingTop: hp('5%')},
        ]}>
        {/* <Text>OtpScreen</Text> */}

        <View style={styles.backBtnDiv}>
          <IconBtn
            name={'chevron-back'}
            size={30}
            onpress={onBackPressHandler}
          />
        </View>
        <Text style={[styles.slogenText]}>Enter your 6-digit code</Text>
        <View style={styles.inputBarDiv}>
          <InputBar
            placeholder={'------'}
            requireTitle={true}
            title={'Code'}
            keyboardType={'phone-pad'}
            placeholderTextColor={'black'}
            isSpaceRequired={true}
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />
        </View>
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
        <View style={styles.btnDiv}>
          <TextButton
            title={'Resend Code'}
            paddingVertical={hp('3%')}
            color={themeColors.primaryGreen}
            fontSize={18}
            letterSpacing={0}
          />
          <IconBtn
            name={'chevron-forward'}
            size={30}
            shadow={10}
            backgroundColor={themeColors.primaryGreen}
            color={'white'}
            paddingVertical={hp('2.25%')}
            paddingHorizontal={hp('2.25%')}
            borderRadius={100}
            onpress={submitOtp}
          />
        </View>
      </KeyboardAvoidingView>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    // alignItems: 'flex-start',
    backgroundColor: themeColors.primaryBackground,
  },
  page: {
    flex: 1,
    // alignItems: 'flex-start',
    // backgroundColor: '#FCFCFC',
  },
  backBtnDiv: {
    marginHorizontal: wp('5%'),
    marginBottom: hp('6.5%'),
  },
  posterImage: {
    width: screen.width,
    height: screen.height * 0.42,
    position: 'absolute',
    // zIndex: -100,
    // top: 0,
  },
  slogenText: {
    fontSize: 26,
    fontFamily: fontFamilies.primarySemiBold,
    // width: wp('57%'),
    color: 'black',
    marginLeft: wp('6%'),
    marginBottom: hp('2%'),
    // alignSelf: 'center',
  },
  inputBarDiv: {
    marginHorizontal: wp('5%'),
    marginVertical: hp('1.5%'),
    marginBottom: hp('2.5%'),
  },

  btnDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1,
    width: wp('100%'),
    // alignSelf: 'center',
    paddingHorizontal: hp('3%'),
    bottom: hp('3.5%'),
  },
});
