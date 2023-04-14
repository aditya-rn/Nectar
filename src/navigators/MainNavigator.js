import {NavigationContainer} from '@react-navigation/native';
import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import LoadingPage from '../components/LoadingPage';
import {ProductContextProvider} from '../data/ProductContext';
import {
  UserAuthenticationContext,
  UserAuthenticationContextProvider,
} from '../data/UserAuthenticationContext';
import StackNavigator from './StackNavigator';

export default MainNavigator = () => {
  const Userauthenticationcontext = useContext(UserAuthenticationContext);

  return (
    <NavigationContainer>
      <UserAuthenticationContextProvider>
        <ProductContextProvider>
          {!Userauthenticationcontext.isLoading ? (
            <StackNavigator />
          ) : (
            <LoadingPage />
          )}
          {/* {Userauthenticationcontext.isLoading && <LoadingPage />} */}
        </ProductContextProvider>
      </UserAuthenticationContextProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
