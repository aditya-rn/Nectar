import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MainNavigator from './src/navigators/MainNavigator';
import {Settings, LoginManager, Profile} from 'react-native-fbsdk-next';
import app from '@react-native-firebase/app';
import {firebaseConfig} from './src/data/Credentials';

export default class App extends Component {
  componentDidMount() {
    // app.initializeApp({...firebaseConfig, databaseURL: ''});
    Platform.OS == 'android' && SplashScreen.hide();
    Settings.initializeSDK();
  }

  render() {
    return (
      <>
        <MainNavigator />
      </>
    );
  }
}
