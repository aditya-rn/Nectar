import {useNavigation} from '@react-navigation/native';
import {City, State} from 'country-state-city';
// import {getCountries, getStates} from 'country-state-picker';
import {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
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
import CustomComponentBtn from '../../components/CustomComponentBtn';
import IconBtn from '../../components/IconBtn';
import InputBar from '../../components/InputBar';
import LoadingPage from '../../components/LoadingPage';
import PickerBar from '../../components/PickerBar';
import SimpleBtn from '../../components/SimpleBtn';
import TextButton from '../../components/TextButton';
import {getStatesfromLibrary} from '../../data/GetCountries';
import {UserAuthenticationContext} from '../../data/UserAuthenticationContext';
import {fontFamilies, themeColors} from '../../styles/Constants';
const screen = Dimensions.get('screen');

export default LocationPickerScreen = () => {
  const navigation = useNavigation();

  const Userauthenticationcontext = useContext(UserAuthenticationContext);
  const [otp, setOtp] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [listType, setListType] = useState('state');
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [pickedLocations, setPickedLocations] = useState({});

  useEffect(() => {
    Userauthenticationcontext.setIsLoading(false);
  }, [listType]);

  const changeState = obj => {
    setPickedLocations({state: {...obj}});
    setStateList([]);
    closeModal();
  };
  const changeCity = obj => {
    setPickedLocations({...pickedLocations, city: {...obj}});
    setCityList([]);
    closeModal();
  };

  const submitData = () => {
    navigation.navigate('HomeScreen');
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = mode => {
    if (mode == 'city' && !pickedLocations.state) {
      Alert.alert('Oops', 'Select State First !!');
      return;
    }

    setListType(mode);
    setShowModal(true);
    setTimeout(() => {
      setLists(mode);
    }, 1000);
  };
  const setLists = mode => {
    if (mode == 'state') {
      // let stateList = State.getStatesOfCountry('IN');
      getStatesfromLibrary('IN').then(item => {
        console.log('itemofcountry');
        console.log(item);
      });
      setStateList([...stateList]);
    } else {
      let city = City.getCitiesOfState('IN', pickedLocations.state.isoCode);
      setCityList([...city]);
    }
  };

  const renderItem = ({item}) => {
    return (
      <CustomComponentBtn
        onpress={
          listType == 'state'
            ? changeState.bind(this, item)
            : changeCity.bind(this, item)
        }>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </CustomComponentBtn>
    );
  };

  return (
    <View style={styles.mainDiv}>
      {showModal && (
        <Modal visible={showModal} animationType="slide" transparent>
          {((listType == 'state' && stateList.length == 0) ||
            (listType == 'city' && cityList.length == 0)) && <LoadingPage />}
          {((listType == 'state' && stateList.length != 0) ||
            (listType == 'city' && cityList.length != 0)) && (
            <SafeAreaView style={{flex: 1}}>
              <View style={styles.modalDiv}>
                <IconBtn
                  name={'close'}
                  size={30}
                  marginHorizontal={wp('5%')}
                  onpress={closeModal}
                  color={'black'}
                  marginVertical={hp('2%')}
                />
                <FlatList
                  data={listType == 'state' ? stateList : cityList}
                  renderItem={renderItem}
                />
              </View>
            </SafeAreaView>
          )}
        </Modal>
      )}
      <Image
        source={require('../../assets/Images/LoginScreenPoster.png')}
        style={[styles.posterImage]}
        resizeMode="contain"
        blurRadius={100}
      />

      <SafeAreaView
        style={[{flex: 1}, Platform.OS == 'android' && {paddingTop: hp('5%')}]}>
        {/* <Text>OtpScreen</Text> */}

        {/* <View style={styles.backBtnDiv}>
          <IconBtn
            name={'chevron-back'}
            size={30}
            onpress={onBackPressHandler}
          />
        </View> */}
        <Image
          style={styles.mapLogo}
          source={require('../../assets/Images/Logo/GoogleMapLogo.png')}
          resizeMode="contain"
        />
        <Text style={[styles.slogenText]}>Select Your Location</Text>
        <Text style={styles.hintDiv}>
          Switch on your location to stay in tune with what’s happening in your
          area
        </Text>
        <View style={styles.pickerDiv}>
          <PickerBar
            requireTitle={true}
            title={'Your Zone'}
            detail={
              !!pickedLocations.state
                ? pickedLocations.state.name
                : 'Select Your Country'
            }
            detailColor={
              !!pickedLocations.state ? 'black' : themeColors.primaryGray
            }
            onpress={() => {
              getStatesfromLibrary('IN').then(item => {
                console.log('itemofcountry');
                console.log(item);
              });
            }}
          />
          <PickerBar
            requireTitle={true}
            title={'Your Area'}
            detail={
              !!pickedLocations.city
                ? pickedLocations.city.name
                : 'Types of Your Area'
            }
            detailColor={
              !!pickedLocations.city ? 'black' : themeColors.primaryGray
            }
            onpress={openModal.bind(this, 'city')}
          />
        </View>
        <View style={styles.submitBtnDiv}>
          <SimpleBtn title={'Submit'} onpress={submitData} />
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
  backBtnDiv: {
    marginHorizontal: wp('5%'),
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
    // marginLeft: wp('6%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
    // alignSelf: 'center',
  },
  hintDiv: {
    fontSize: 16,
    fontFamily: fontFamilies.primaryMedium,
    width: wp('80%'),
    alignSelf: 'center',
    textAlign: 'center',
    color: themeColors.primaryGray,
  },
  mapLogo: {
    width: wp('56%'),
    alignSelf: 'center',
    height: hp('20%'),
    marginVertical: hp('4%'),
    // backgroundColor: 'red',
    // position: 'absolute',
  },
  pickerDiv: {
    marginTop: hp('10.5%'),
    paddingHorizontal: wp('5%'),
  },
  submitBtnDiv: {
    marginTop: hp('1.5%'),
  },
  modalDiv: {
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: themeColors.primaryBackground,
    flex: 1,
    // borderWidth: 2,
  },
  listItem: {
    backgroundColor: 'white',
    paddingHorizontal: wp('5%'),
    marginHorizontal: wp('5%'),
    paddingVertical: hp('1.5%'),
    marginVertical: 5,
    shadowColor: 'black',
    borderRadius: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  itemText: {
    fontSize: 18,
    fontFamily: fontFamilies.primaryMedium,
    textAlignVertical: 'center',
  },
});
