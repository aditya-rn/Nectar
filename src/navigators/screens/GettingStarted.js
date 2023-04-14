import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingPage from '../../components/LoadingPage';
import SimpleBtn from '../../components/SimpleBtn';
import {UserAuthenticationContext} from '../../data/UserAuthenticationContext';
import {fontFamilies, themeColors} from '../../styles/Constants';

export default GettingStarted = () => {
  const [screen, setScreen] = useState(Dimensions.get('screen'));
  const Userauthenticationcontext = useContext(UserAuthenticationContext);

  Dimensions.addEventListener('change', e => {
    setScreen({...e});
  });

  const arr = [
    {
      text: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
      image: require('../../assets/Images/CarotColorful.png'),
    },
    {
      text: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
      image: require('../../assets/Images/CarotColorful.png'),
    },
    {
      text: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
      image: require('../../assets/Images/CarotColorful.png'),
    },
    {
      text: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
      image: require('../../assets/Images/CarotColorful.png'),
    },
    {
      text: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
    },
    {
      text: 'abcdefghijklmnopqrstuvwxyz',
    },
    {
      text: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
    },
    {
      text: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
    },
    {
      text: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
    },
  ];

  const FloatingMessageComponent = ({data, index}) => {
    return (
      <View style={styles.messageBoxDiv}>
        <View style={styles.miniTriangle}></View>
        <View style={styles.messageBox}>
          <Icon
            name="close"
            color={'black'}
            size={20}
            style={styles.closeBtn}
          />
          {!!data.image && (
            <Image
              source={data.image}
              style={styles.floatingListItemAvatar}
              resizeMode="contain"
            />
          )}
          <Text style={styles.textDiv}>{data.text}</Text>
        </View>
      </View>
    );
  };

  const goToLoginScreen = () => navigation.navigate('LoginScreen');
  const navigation = useNavigation();
  if (Userauthenticationcontext.isLoading) {
    return (
      <View style={styles.loaderPage}>
        <LoadingPage loadingText="Please wait .." />
      </View>
    );
  }
  return (
    <>
      {/* <View style={styles.floatingMainDiv}>
        <View style={styles.floatingListDiv}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {arr.map((item, index) => (
              <FloatingMessageComponent data={item} key={index} index={index} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.backgroundDummyDiv}></View>
      </View> */}

      <View style={styles.page}>
        <ImageBackground
          source={require('../../assets/Images/GettingStarted.jpg')}
          // resizeMode="contain"
          style={[
            styles.bgImage,
            {height: screen.height, width: screen.width},
          ]}>
          <View style={styles.detailsDiv}>
            <Image
              source={require('../../assets/Images/Carot.png')}
              style={styles.carotLogo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Welcome to our store</Text>
            <Text style={styles.slogenText}>
              Get your groceries in as fast as one hour
            </Text>
            <View style={styles.getStartedBtnDiv}>
              <SimpleBtn title={'Get Started'} onpress={goToLoginScreen} />
            </View>
          </View>

          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor={'transparent'}
          />
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  loaderPage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    zIndex: 10,
  },
  bgImage: {
    justifyContent: 'flex-end',
    flex: 1,

    paddingBottom: Dimensions.get('screen').height * 0.1,
  },
  detailsDiv: {
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // left: 0,
  },
  getStartedBtnDiv: {
    // position: 'absolute',
  },
  slogenText: {
    color: themeColors.slogenColor,
    fontFamily: fontFamilies.primaryMedium,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: hp('4.5%'),
    marginTop: hp('1.5%'),
  },
  welcomeText: {
    color: 'white',
    fontFamily: fontFamilies.primaryBold,
    fontSize: 48,
    alignSelf: 'center',
    width: wp('65%'),
    // backgroundColor: 'red',
    textAlign: 'center',
  },
  carotLogo: {
    height: hp('10%'),
    width: wp('12%'),
    alignSelf: 'center',
    // backgroundColor: 'red',
    marginVertical: hp('2%'),
  },
  floatingMainDiv: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    // opacity: 0.2,
  },
  floatingListDiv: {
    height: hp('40%'),
    zIndex: 10,
    marginTop: hp('5%'),
    // marginHorizontal: wp('5%'),
    // width: wp('90%'),
  },
  messageBoxDiv: {
    // backgroundColor: 'white',
    marginVertical: hp('0.3%'),
    // marginHorizontal: wp('5%'),
    // width: wp('90%'),
  },
  messageBox: {
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    // width: '90%',
    width: wp('90%'),
    alignItems: 'center',
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('2%'),
    paddingTop: hp('2.5%'),
    borderRadius: 15,
    // marginHorizontal: wp('5%'),
  },
  floatingListItemAvatar: {
    height: hp('5%'),
    width: hp('5%'),
  },
  textDiv: {
    // backgroundColor: 'yellow',
    marginVertical: hp('1%'),
    marginHorizontal: wp('1%'),
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    right: wp('2%'),
    top: hp('0.5%'),
  },
  miniTriangle: {
    backgroundColor: 'white',
    height: hp('1%'),
    width: hp('1%'),
    transform: [{rotateZ: '45deg'}],
    alignSelf: 'center',
    zIndex: -1,
    marginBottom: hp('-0.5%'),
  },
  backgroundDummyDiv: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: 'white',
    opacity: 0.2,
    position: 'absolute',
  },
});
