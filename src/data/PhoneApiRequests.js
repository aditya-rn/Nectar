import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {firebaseConfig} from './Credentials';

export const signInWithPhoneNumber = async phoneNumber => {
  //   app.initializeApp({...firebaseConfig, databaseURL: ''});

  try {
    const response = await auth().signInWithPhoneNumber(phoneNumber);
    // let conres = await response.confirm('886644');
    console.log('response phone');
    console.log(response);
    return {
      isError: false,
      phoneResponse: response,
      // errorCode
    };
  } catch (error) {
    console.log('error');
    console.log(error);
    return {
      isError: true,
      response: error,
      // errorCode
    };
  }
};

export const confirmOtpFromServer = async (confirmResponse, otpCode) => {
  try {
    let conres = await confirmResponse.confirm(otpCode);
    console.log('conres');
    console.log(conres);
    return {
      isError: false,
      response: conres,
      // errorCode
    };
  } catch (error) {
    console.log('error in conress');
    console.log(error);
    return {
      isError: true,
      response: error,
      // errorCode
    };
  }
};

export const signOutFromPhoneApi = async () => {
  try {
    let signOutRes = await auth().signOut();
    return {
      isError: false,
      response: signOutRes,
      // errorCode
    };
  } catch (error) {
    console.log('error');
    console.log(error);
    return {
      isError: true,
      response: error,
      // errorCode
    };
  }
};
