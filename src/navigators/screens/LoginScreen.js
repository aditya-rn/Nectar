import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {
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
import ButtonWithIcon from '../../components/ButtonWithIcon';
import IconBtn from '../../components/IconBtn';
import InputBar from '../../components/InputBar';
import LoadingPage from '../../components/LoadingPage';
import SimpleBtn from '../../components/SimpleBtn';
import TextButton from '../../components/TextButton';
import {UserAuthenticationContext} from '../../data/UserAuthenticationContext';
import {fontFamilies, themeColors} from '../../styles/Constants';
const screen = Dimensions.get('screen');

export default LoginScreen = () => {
  const navigation = useNavigation();
  const Userauthenticationcontext = useContext(UserAuthenticationContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //   const [otp, setOtp] = useState('');
  const goToLoginWithPhoneScreen = () => {
    navigation.navigate('LoginWithPhoneScreen');
  };
  const goToSignupScreen = () => {
    navigation.navigate('SignupScreen');
  };

  const submitData = () => {
    Userauthenticationcontext.setIsLoading(true);
    Userauthenticationcontext.login({
      username,
      password,
    });
  };

  return (
    <View style={styles.mainDiv}>
      {!!Userauthenticationcontext.isLoading && (
        <Modal
          transparent
          visible={Userauthenticationcontext.isLoading}
          animationType="fade">
          <LoadingPage />
        </Modal>
      )}
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
        <Text style={[styles.pageHeading]}>Login</Text>

        <Text style={styles.hintDiv}>Enter your emails and password</Text>
        <View style={styles.inputBarDiv}>
          <InputBar
            placeholder={'Enter Username'}
            requireTitle={true}
            title={'Username'}
            placeholderTextColor={themeColors.primaryGray}
            maxLength={30}
            value={username}
            keyboardType={'email-address'}
            onChangeText={setUsername}
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
        <View style={styles.forgotPasswordBtnDiv}>
          <TextButton
            title={'Forgot Password?'}
            fontSize={14}
            letterSpacing={0.5}
            color={'#181725'}
          />
        </View>

        <View style={styles.submitBtnDiv}>
          <SimpleBtn title={'Submit'} onpress={submitData} />
        </View>
        <View style={styles.signUpHintDiv}>
          <Text style={styles.signupHintText}>Don't have an account ? </Text>
          <TextButton
            title={'Sign Up'}
            onpress={goToSignupScreen}
            color={themeColors.primaryGreen}
          />
        </View>
        <View>
          <ButtonWithIcon
            title={'Enter Phone Number'}
            backgroundColor={'#5383EC'}
            iconPath={require('../../assets/Images/Logo/PhoneCallLogo.png')}
            onpress={goToLoginWithPhoneScreen}
          />
          <View style={styles.buttonDiv}>
            <ButtonWithIcon
              title={'Continue With Google'}
              backgroundColor={'#5383EC'}
              iconPath={require('../../assets/Images/Logo/GoogleLogo.png')}
              onpress={Userauthenticationcontext.signInWithGoogle}
            />
          </View>
          <ButtonWithIcon
            title={'Continue With Facebook'}
            backgroundColor={'#4A66AC'}
            iconPath={require('../../assets/Images/Logo/FacebookLogo.png')}
            onpress={Userauthenticationcontext.signInWithfacebook}
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
    marginVertical: hp('2%'),
    marginBottom: hp('2.5%'),
    alignSelf: 'center',
    // backgroundColor: 'red',
    // position:"absolute",
  },
  pageHeading: {
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
    marginBottom: hp('1.5%'),
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
  submitBtnDiv: {
    marginTop: hp('2.5%'),
  },
  forgotPasswordBtnDiv: {
    alignSelf: 'flex-end',
    marginRight: wp('5%'),
  },
  signUpHintDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('2.5%'),
  },
  signupHintText: {
    fontFamily: fontFamilies.primaryMedium,
    letterSpacing: 0.5,
  },
  buttonDiv: {
    marginVertical: hp('1%'),
  },
});
