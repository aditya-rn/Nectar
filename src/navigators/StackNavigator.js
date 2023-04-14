import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import LoadingPage from '../components/LoadingPage';
import {UserAuthenticationContext} from '../data/UserAuthenticationContext';
import BottomTabNavigator from './BottomTabNavigator';
import AllProducts from './screens/AllProducts';
import CategoryProductsScreen from './screens/CategoryProductsScreen';
import GettingStarted from './screens/GettingStarted';
import LocationPickerScreen from './screens/LocationPickerScreen';
import LoginScreen from './screens/LoginScreen';
import LoginWithPhoneScreen from './screens/LoginWithPhoneScreen';
import OrderDoneScreen from './screens/OrderDoneScreen';
import OtpScreen from './screens/OtpScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import SignupScreen from './screens/SignupScreen';

export default StackNavigator = () => {
  let Stack = createNativeStackNavigator();
  const Userauthenticationcontext = useContext(UserAuthenticationContext);

  const UnAuthenticatedStack = () => (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'GettingStarted'}>
      <Stack.Screen name="GettingStarted" component={GettingStarted} />
      <Stack.Screen
        name="LoginWithPhoneScreen"
        component={LoginWithPhoneScreen}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
  const AuthenticatedStack = () => (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'BottomTabNavigator'}>
      <Stack.Screen
        name="LocationPickerScreen"
        component={LocationPickerScreen}
      />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name="CategoryProductsScreen"
        component={CategoryProductsScreen}
      />
      <Stack.Screen name="OrderDoneScreen" component={OrderDoneScreen} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
    </Stack.Navigator>
  );

  return (
    <>
      {!!Userauthenticationcontext.isAuthenticated && <AuthenticatedStack />}
      {!Userauthenticationcontext.isAuthenticated && <UnAuthenticatedStack />}
    </>
  );
};
