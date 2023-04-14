import {Settings, LoginManager, Profile} from 'react-native-fbsdk-next';
import {FacebookAppID} from './Credentials';

const initFb = () => {
  Settings.setAppID(FacebookAppID);
  Settings.initializeSDK();
};

export const signInToFacebookApi = async () => {
  initFb();
  let login = await LoginManager.logInWithPermissions(['public_profile']);
  console.log('login');
  console.log(login);
  if (login.isCancelled) {
    const returnObject = {
      isError: true,
      errorCode: 'userCancelled',
    };
    return returnObject;
  } else {
    let user = await Profile.getCurrentProfile();
    console.log('user');
    console.log(user);
    if (!user) {
      const returnObject = {
        isError: true,
        errorCode: 'errorGettingUserInfo',
      };
      return returnObject;
    }
    const returnObject = {
      isError: false,
      userDetails: {
        username: user.name,
        photo: user.imageURL,
        email: user.email,
        id: user.userID,
      },
    };

    return returnObject;
  }
};

export const signOutFromFacebookApi = async () => {
  initFb();
  try {
    let login = LoginManager.logOut();
    const returnObject = {
      isError: false,
    };
    return returnObject;
  } catch (error) {
    const returnObject = {
      isError: true,
      errorCode: error.toString(),
    };
    return returnObject;
  }

  //   if (login.isCancelled) {
  //     const returnObject = {
  //       isError: true,
  //       errorCode: 'userCancelled',
  //     };
  //     return returnObject;
  //   } else {
  //     let user = await Profile.getCurrentProfile();
  //     if (!user) {
  //       const returnObject = {
  //         isError: true,
  //         errorCode: 'errorGettingUserInfo',
  //       };
  //       return returnObject;
  //     }
  //     const returnObject = {
  //       isError: false,
  //       userDetails: {
  //         username: user.name,
  //         photo: user.imageURL,
  //         email: user.email,
  //         id: user.userID,
  //       },
  //     };

  //     return returnObject;
  //   }
};
