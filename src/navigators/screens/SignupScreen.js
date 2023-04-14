import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
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
import ButtonWithIcon from '../../components/ButtonWithIcon';
import IconBtn from '../../components/IconBtn';
import InputBar from '../../components/InputBar';
import PrivacyPolicyBlock from '../../components/PrivacyPolicyBlock';
import SimpleBtn from '../../components/SimpleBtn';
import TextButton from '../../components/TextButton';
import {UserAuthenticationContext} from '../../data/UserAuthenticationContext';
import {fontFamilies, themeColors} from '../../styles/Constants';
const screen = Dimensions.get('screen');

export default SignupScreen = () => {
  const navigation = useNavigation();
  const Userauthenticationcontext = useContext(UserAuthenticationContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   const [otp, setOtp] = useState('');
  const goToLoginScreen = () => {
    console.log('running');
    navigation.navigate('LoginScreen');
  };
  const submitData = () => {
    Userauthenticationcontext.login({
      email,
      password,
      username,
    });
  };

  return (
    <View style={styles.mainDiv}>
      <Image
        source={require('../../assets/Images/LoginScreenPoster.png')}
        style={[styles.posterImage]}
        resizeMode="contain"
        blurRadius={120}
      />

      <SafeAreaView
        style={[
          styles.page,
          Platform.OS == 'android' && {paddingTop: hp('5%')},
        ]}>
        {/* <Text>OtpScreen</Text> */}
        <Image
          source={require('../../assets/Images/CarotColorful.png')}
          style={styles.carotLogo}
          resizeMode={'contain'}
        />
        <Text style={[styles.slogenText]}>Sign Up</Text>

        <Text style={styles.hintDiv}>Enter your credentials to continue</Text>
        <View style={styles.inputBarDiv}>
          <InputBar
            placeholder={'Enter username'}
            requireTitle={true}
            title={'Username'}
            placeholderTextColor={themeColors.primaryGray}
            maxLength={30}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputBarDiv}>
          <InputBar
            placeholder={'Enter Email ID'}
            requireTitle={true}
            title={'Email'}
            placeholderTextColor={themeColors.primaryGray}
            maxLength={30}
            value={email}
            onChangeText={setEmail}
            keyboardType={'email-address'}
          />
        </View>
        <View style={styles.inputBarDiv}>
          <InputBar
            placeholder={'Enter Password'}
            requireTitle={true}
            title={'Password'}
            placeholderTextColor={themeColors.primaryGray}
            maxLength={20}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.privacyPolicyDiv}>
          <PrivacyPolicyBlock />
        </View>

        <View style={styles.submitBtnDiv}>
          <SimpleBtn title={'Submit'} onpress={submitData} />
        </View>
        <View style={styles.loginHintDiv}>
          <Text style={styles.loginHintText}>Already have an account ? </Text>
          <TextButton
            title={'Login'}
            onpress={goToLoginScreen}
            color={themeColors.primaryGreen}
          />
        </View>
      </SafeAreaView>

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
    opacity: 0.7,
    // zIndex: -100,
    // top: 0,
  },
  carotLogo: {
    height: hp('6.5%'),
    width: wp('12%'),
    marginVertical: hp('4%'),
    marginBottom: hp('10%'),
    alignSelf: 'center',
    // backgroundColor: 'red',
    // position:"absolute",
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
  hintDiv: {
    fontSize: 16,
    fontFamily: fontFamilies.primaryMedium,
    width: wp('80%'),
    color: themeColors.primaryGray,
    marginHorizontal: wp('6%'),
    marginBottom: hp('3.5%'),
  },
  inputBarDiv: {
    marginHorizontal: wp('5%'),
    marginVertical: hp('1.5%'),
    marginBottom: hp('2.5%'),
  },

  privacyPolicyDiv: {
    // backgroundColor: 'red',
    width: wp('90%'),
    alignSelf: 'center',
    // flex: 1,
  },
  loginHintDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('2%'),
    marginBottom: hp('4%'),
  },
  loginHintText: {
    fontFamily: fontFamilies.primarySemiBold,
    letterSpacing: 0.5,
    color: 'black',
  },
  submitBtnDiv: {
    marginVertical: hp('1%'),
    // backgroundColor: 'red',
  },
});
