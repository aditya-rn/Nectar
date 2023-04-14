import AsyncStorage from '@react-native-async-storage/async-storage';
import {statusCodes} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import OtpScreen from '../navigators/screens/OtpScreen';
import {loginInApi} from './ApiLogin';
import {
  signInToFacebookApi,
  signOutFromFacebookApi,
} from './FacebookApiRequests';
import {signInToGoogleApi, signOutFromGoogleApi} from './GoogleApiRequests';
import {
  confirmOtpFromServer,
  signInWithPhoneNumber,
  signOutFromPhoneApi,
} from './PhoneApiRequests';

export const UserAuthenticationContext = createContext({
  isAuthenticated: false,
  isLoading: false,
  setIsLoading: value => {},
  login: async data => {},
  signup: data => {},
  userDetails: {},
  logout: async () => {},
  signInWithGoogle: async () => {},
  signOutFromGoogle: async () => {},
  signInWithfacebook: async () => {},
  signOutFromfacebook: async () => {},
  signInWithPhone: async number => {},
  verifyOtp: async otpCode => {},
  signOutFromPhone: async () => {},
  isPhoneEntred: false,
});

export const UserAuthenticationContextProvider = ({children}) => {
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumberResponse, setphoneNumberResponse] = useState();
  const [isPhoneEntred, setIsPhoneEntred] = useState(false);
  const navigation = useNavigation();

  const getUserFromLocalStorage = async () => {
    setIsLoading(true);
    const userStored = await AsyncStorage.getItem('user');
    if (!userStored) {
      setIsAuthenticated(false);
    } else {
      const user = JSON.parse(userStored);
      setUserDetails({...user});
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserFromLocalStorage();
    // setIsLoading(false);
  }, []);

  const login = async data => {
    setIsLoading(true);
    if (!!data && !!data.username && !!data.password) {
      const loginResponse = await loginInApi(data);
      if (!!loginResponse.isError) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      const user = {
        ...loginResponse.user,
        name: loginResponse.user.firstName + ' ' + loginResponse.user.lastName,
        photo: loginResponse.user.image,
      };
      setUserDetails({...user});
      let userInString = JSON.stringify(user);
      try {
        let storeToLocal = await AsyncStorage.setItem('user', userInString);
        setIsAuthenticated(true);
        navigation.reset({index: 0, routes: [{name: 'BottomTabNavigator'}]});

        setIsLoading(false);
        return;
      } catch (error) {
        Alert.alert('Oops', 'Error while storing user details !!');
        setIsAuthenticated(true);
        navigation.reset({index: 0, routes: [{name: 'BottomTabNavigator'}]});

        setIsLoading(false);
      }

      return;
    }
    Alert.alert('Oops', 'Enter all details !!');
    setIsLoading(false);
  };
  const signup = data => {
    if (!!data && !!data.username && !!data.email && !!data.password) {
      setIsAuthenticated(true);
      return;
    }
    Alert.alert('Oops', 'Enter all details !!');
    setIsLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    const responseFromApi = await signInToGoogleApi();
    if (
      !!responseFromApi.isError &&
      responseFromApi.errorCode.code == statusCodes.SIGN_IN_CANCELLED
    ) {
      setIsLoading(false);
      return;
    } else if (
      !!responseFromApi.isError &&
      responseFromApi.errorCode.code == statusCodes.PLAY_SERVICES_NOT_AVAILABLE
    ) {
      Alert.alert(
        'Oops',
        'Play services not available at moment.\nTry after sometime !!',
      );
      setIsLoading(false);
      return;
    } else if (!responseFromApi.isError) {
      setUserDetails({...responseFromApi.userDetails, platform: 'google'});
      setIsAuthenticated(true);
      navigation.reset({index: 0, routes: [{name: 'BottomTabNavigator'}]});
      setIsLoading(false);
      return;
    }
  };
  const signOutFromGoogle = async () => {
    setIsLoading(true);
    let responseFromApi = await signOutFromGoogleApi();
    if (!!responseFromApi && !responseFromApi.isError) {
      setUserDetails({});
      setIsAuthenticated(false);
      setIsLoading(false);
    } else if (!!responseFromApi && !!responseFromApi.isError) {
      Alert.alert('Oops', 'Error in signing out\nTry after sometime !!');
      console.log(responseFromApi.errorCode);
      setIsLoading(false);
    }
  };

  const signInWithfacebook = async () => {
    setIsLoading(true);
    const response = await signInToFacebookApi();
    if (!!response.isError && response.errorCode == 'errorGettingUserInfo') {
      Alert.alert('Oops', 'Error while getting user info !!');
      setIsLoading(false);
      return;
    } else if (!!response.isError && response.errorCode == 'userCancelled') {
      setIsLoading(false);
      return;
    } else if (!response.isError) {
      setUserDetails({...response.userDetails, platform: 'facebook'});
      setIsAuthenticated(true);
      navigation.reset({index: 0, routes: [{name: 'BottomTabNavigator'}]});
      setIsLoading(false);
      return;
    }
  };
  const signOutFromfacebook = async () => {
    const response = await signOutFromFacebookApi();
    if (response.isError) {
      Alert.alert('Oops', response.errorCode);
      setIsLoading(false);
      return;
    }
    setUserDetails({});
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  const clearUserData = async () => {};

  const signInWithPhone = async number => {
    setIsLoading(true);
    const response = await signInWithPhoneNumber(number);
    setIsLoading(false);
    if (!!response.isError) {
      Alert.alert('Oops', 'Error while siging in !!');
      return false;
    } else if (!response.isError) {
      // setUserDetails({...response.userDetails, platform: 'phone'});
      // setIsAuthenticated(true);
      setphoneNumberResponse(response.phoneResponse);
      setIsPhoneEntred(true);
      return true;
    }
  };
  const verifyOtp = async otpCode => {
    setIsLoading(true);
    let verify = await confirmOtpFromServer(phoneNumberResponse, otpCode);
    if (!!verify.isError) {
      Alert.alert('Oops', 'Error while siging in !!');
      setIsLoading(false);
      return false;
    } else if (!verify.isError) {
      setUserDetails({...verify.userDetails, platform: 'phone'});
      setIsAuthenticated(true);

      setIsLoading(false);
      return true;
    }
  };
  const signOutFromPhone = async () => {
    const response = await signOutFromPhoneApi();
    if (response.isError) {
      Alert.alert('Oops', response.errorCode);
      setIsLoading(false);
      return;
    }
    setUserDetails({});
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    const userStored = await AsyncStorage.removeItem('user');
    switch (userDetails.platform) {
      case 'google':
        await signOutFromGoogle();
        break;
      case 'facebook':
        await signOutFromfacebook();
        break;
      case 'phone':
        await signOutFromPhone();
        break;

      default:
        setUserDetails({});
        setIsAuthenticated(false);
        setIsLoading(false);
        break;
    }
    navigation.reset({index: 0, routes: [{name: 'GettingStarted'}]});
  };

  const contextValues = {
    userDetails,
    isAuthenticated,
    isLoading,
    login,
    signup,
    signInWithGoogle,
    signOutFromGoogle,
    signInWithfacebook,
    signOutFromfacebook,
    signInWithPhone,
    verifyOtp,
    signOutFromPhone,
    setIsLoading,
    logout,
    isPhoneEntred,
  };

  return (
    <UserAuthenticationContext.Provider value={contextValues}>
      {children}
    </UserAuthenticationContext.Provider>
  );
};
