import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googleApiAndroid, googleApiIOS, googleApiWeb} from './Credentials';

export const signInToGoogleApi = async () => {
  const configureDetails = GoogleSignin.configure({
    iosClientId: googleApiIOS,
    // webClientId: googleApiWeb,
  });

  const hasPlayServices = await GoogleSignin.hasPlayServices();
  try {
    // console.log('running');
    // console.log(hasPlayServices);
    if (!!hasPlayServices) {
      const response = await GoogleSignin.signIn();
      console.log('response');
      console.log(response);
      if (!!response.error) {
        throw response.error;
      } else {
        const returnObject = {
          isError: false,
          userDetails: {
            username: response.user.name,
            id: response.user.id,
            email: response.user.email,
            photo: response.user.photo,
          },
        };
        return returnObject;
      }
    } else {
      throw 'NoPlayService';
    }
  } catch (error) {
    console.log('running er');
    console.log(error);
    const returnObject = {
      isError: true,
      errorCode: error,
    };
    return returnObject;
  }

  //   GoogleSignin.signIn()
  //   .then(userInfo => {
  //     const returnObject = {
  //       isError: false,
  //       userDetails: {
  //         username: userInfo.user.name,
  //         id: userInfo.user.id,
  //         email: userInfo.user.email,
  //         photo: userInfo.user.photo,
  //       },
  //     };
  //     return returnObject;
  //   })
  //   .catch(e => {
  //     const returnObject = {
  //       isError: true,
  //       error: e,
  //     };
  //     return returnObject;
  //   });

  // .catch(e => {
  //   const returnObject = {
  //     isError: true,
  //     error: e,
  //   };
  //   return returnObject;
  // });
};

export const signOutFromGoogleApi = async () => {
  try {
    const responseFromSignOut = await GoogleSignin.signOut();
    const returnObject = {
      isError: false,
    };
    return returnObject;
  } catch (error) {
    const returnObject = {
      isError: true,
      errorCode: error,
    };
    return returnObject;
  }
};
