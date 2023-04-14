import {useNavigation} from '@react-navigation/native';
import {useContext, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Modal,
  ScrollView,
  Animated,
  Easing,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import CustomComponentBtn from '../../components/CustomComponentBtn';
import InputBar from '../../components/InputBar';
import {countryCodesWithMap} from '../../data/Countrycodes';
import {fontFamilies, themeColors} from '../../styles/Constants';
import CountryPicker from 'react-native-country-picker-modal';
import IconBtn from '../../components/IconBtn';
import TextButton from '../../components/TextButton';
import {UserAuthenticationContext} from '../../data/UserAuthenticationContext';
import LoadingPage from '../../components/LoadingPage';

const screen = Dimensions.get('screen');

export default LoginWithPhoneScreen = () => {
  const navigation = useNavigation();
  const Userauthenticationcontext = useContext(UserAuthenticationContext);

  // navigation.addListener()
  const [countrySelected, setCountrySelected] = useState({
    callingCode: ['91'],
    cca2: 'IN',
    currency: ['INR'],
    flag: 'flag-in',
    name: 'India',
    region: 'Asia',
    subregion: 'Southern Asia',
  });
  const [showCountryListModal, setShowCountryListModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const animatedBlock = useRef(new Animated.Value(hp('31%'))).current;
  const imageRef = useRef(new Animated.Value(0)).current;

  const [styleProps, setStyleProps] = useState({
    text: 'Enter your mobile number',
    display: 'flex',
    position: 'absolute',
    title: 'Mobile Number',
  });

  const doTransition = () => {
    setStyleProps({
      ...styleProps,
      position: 'absolute',
      display: 'none',
      requireTitle: true,
    });

    Animated.parallel([
      Animated.timing(animatedBlock, {
        toValue: hp(0.1),
        duration: 500,
        useNativeDriver: false,
      }).start(),
      Animated.timing(imageRef, {
        toValue: 100,
        duration: 100,
        useNativeDriver: false,
        // friction: 8,
        // tension: 10,
      }).start(),
    ]);
  };
  const rollOverTransition = () => {
    setStyleProps({
      text: 'Enter your mobile number',
      display: 'flex',
      position: 'absolute',
      title: 'Mobile Number',
    });

    Animated.parallel([
      Animated.timing(animatedBlock, {
        toValue: hp('31%'),
        duration: 500,
        useNativeDriver: false,
      }).start(),
      Animated.timing(imageRef, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
        // friction: 8,
        // tension: 10,
      }).start(),
    ]);
  };

  const openModal = () => setShowCountryListModal(true);
  const closeModal = () => setShowCountryListModal(false);
  const onCountrySelectHandler = data => {
    setCountrySelected({...data});
    setShowCountryListModal(false);
  };
  const onKeyboardBackPressHandler = () => {
    Keyboard.dismiss();
    rollOverTransition();
  };
  const onBackPressHandler = () => {
    Keyboard.dismiss();
    rollOverTransition();
    navigation.goBack();
  };

  const submitData = async () => {
    if (!phoneNumber || phoneNumber.length != 10 || !Number(phoneNumber)) {
      Alert.alert('Oops', 'Enter valid number !!');
      return;
    }
    let numberFinal = '+' + countrySelected.callingCode[0] + phoneNumber;
    let isCodeSent = await Userauthenticationcontext.signInWithPhone(
      numberFinal,
    );
    console.log('isCodeSent');
    console.log(isCodeSent);
    if (!!isCodeSent) {
      navigation.navigate('OtpScreen');
    }
  };

  return (
    <>
      <View style={[styles.mainDiv]}>
        {Userauthenticationcontext.isLoading && (
          <Modal transparent visible animationType="fade">
            <LoadingPage loadingText="Please wait .." />
          </Modal>
        )}
        {/* <Animated.View ref={imageRef}>
        <Image
          source={require('../../assets/Images/LoginScreenPoster.png')}
          style={[styles.posterImage]}
          resizeMode="contain"
        />
      </Animated.View> */}
        <Animated.Image
          source={require('../../assets/Images/LoginScreenPoster.png')}
          style={[styles.posterImage, {position: styleProps.position}]}
          resizeMode="contain"
          blurRadius={imageRef}
          ref={imageRef}
        />

        <SafeAreaView
          style={[
            styles.page,
            Platform.OS == 'android' && {paddingTop: hp('5%')},
          ]}>
          <Animated.View
            ref={animatedBlock}
            style={[{marginTop: animatedBlock}]}>
            <View>
              <View style={[styles.backBtn]}>
                <IconBtn
                  name={'chevron-back'}
                  size={30}
                  color={'black'}
                  onpress={onBackPressHandler}
                />
              </View>
            </View>
            <Text
              style={[
                styles.slogenText,
                !!styleProps.requireTitle && {width: wp('100%')},
              ]}>
              {!!styleProps.requireTitle
                ? styleProps.text
                : 'Get your groceries with nectar'}
            </Text>
            <View style={styles.inputBarDiv}>
              <InputBar
                placeholder={'0000000000'}
                isNumber={true}
                isNumberInput={true}
                countrySelected={countrySelected}
                onSelect={onCountrySelectHandler}
                onClose={closeModal}
                onpress={openModal}
                showCountryListModal={showCountryListModal}
                onFocus={doTransition}
                requireTitle={styleProps.requireTitle}
                title={styleProps.title}
                keyboardType={'phone-pad'}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onBlur={onKeyboardBackPressHandler}
              />
            </View>
          </Animated.View>
        </SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
          <View>
            <View style={styles.nextBtn}>
              <IconBtn
                name={'chevron-forward'}
                size={30}
                shadow={10}
                backgroundColor={themeColors.primaryGreen}
                color={'white'}
                paddingVertical={hp('2.25%')}
                paddingHorizontal={hp('2.25%')}
                borderRadius={100}
                onpress={submitData}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    // alignItems: 'flex-start',
    backgroundColor: themeColors.primaryBackground,
  },
  backgrundDummyDiv: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: hp('100%'),
    width: wp('100%'),
    // zIndex: -1,
  },
  modalMainDiv: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: hp('2%'),
    left: wp('2%'),
    right: wp('2%'),
    borderRadius: 10,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      he: 0,
      width: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  mapImage: {
    // backgroundColor: 'green',
    height: hp('5%'),
    width: wp('8%'),
    zIndex: -10,
  },
  posterImage: {
    width: screen.width,
    height: screen.height * 0.42,
    // top: 0,
  },
  page: {
    flex: 1,
    // justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  slogenText: {
    fontSize: 26,
    fontFamily: fontFamilies.primarySemiBold,
    width: wp('57%'),
    color: 'black',
    marginLeft: wp('6%'),
    marginVertical: hp('1%'),
    // alignSelf: 'center',
  },
  inputBarDiv: {
    marginHorizontal: wp('5%'),
    marginVertical: hp('1.5%'),
    marginBottom: hp('2.5%'),
  },

  backBtn: {
    marginHorizontal: wp('5%'),
    marginBottom: hp('6.5%'),
  },
  nextBtn: {
    // backgroundColor: 'green',
    position: 'absolute',
    bottom: hp('3.5%'),
    right: hp('3%'),
  },
});
