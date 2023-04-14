/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import app from '@react-native-firebase/app';
import {firebaseConfig} from './src/data/Credentials';

// app.initializeApp({...firebaseConfig, databaseURL: ''});
AppRegistry.registerComponent(appName, () => App);
