import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  Platform,
  PlatformColor,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {fontFamilies, themeColors} from '../styles/Constants';
import HomeScreen from './screens/HomeScreen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExploreCategoriesScreen from './screens/ExploreCategoriesScreen';
import CartScreen from './screens/CartScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import {useContext, useEffect, useState} from 'react';
import {ProductContext} from '../data/ProductContext';
import AccountScreen from './screens/AccountScreen';
import LoadingPage from '../components/LoadingPage';
import {UserAuthenticationContext} from '../data/UserAuthenticationContext';

export default BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const Productcontext = useContext(ProductContext);
  const Userauthenticationcontext = useContext(UserAuthenticationContext);

  // useEffect(() => {}, [Productcontext.totalInCart, Productcontext.cart]);

  return (
    <BottomTab.Navigator
      initialRouteName="CartScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeColors.primaryGreen,
        tabBarStyle: {
          height: hp('10.5%'),
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopWidth: 0,
          shadowColor: 'black',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 30,
          // borderTopWidth: 0,
          // backgroundColor: 'white',
          // position: 'absolute',
          // bottom: 0,
        },
        tabBarInactiveTintColor: themeColors.primaryBlack,
        tabBarLabelStyle: {
          //   backgroundColor: 'red',
          fontSize: 12,
          fontFamily: fontFamilies.primaryMedium,
          //   paddingBottom: hp('1%'),
        },
        tabBarItemStyle: {
          marginVertical: Platform.OS == 'android' ? hp('2.25%') : hp('1%'),
          //   backgroundColor: 'red',
        },
      }}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              style={styles.tabIconImage}
              source={
                focused
                  ? require('../assets/Images/BottomTabIcons/ShopSelected.png')
                  : require('../assets/Images/BottomTabIcons/Shop.png')
              }
            />
          ),
          title: 'Shop',
        }}
      />
      <BottomTab.Screen
        name="ExploreCategoriesScreen"
        component={ExploreCategoriesScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              style={styles.tabIconImage}
              source={
                focused
                  ? require('../assets/Images/BottomTabIcons/ExploreSelected.png')
                  : require('../assets/Images/BottomTabIcons/Explore.png')
              }
            />
          ),
          title: 'Explore',
        }}
      />
      <BottomTab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({focused, size}) => (
            <View>
              <Image
                resizeMode="contain"
                style={styles.tabIconImage}
                source={
                  focused
                    ? require('../assets/Images/BottomTabIcons/CartSelected.png')
                    : require('../assets/Images/BottomTabIcons/Cart.png')
                }
              />
              {!!Productcontext.cart.totalQuantity &&
                !focused &&
                Productcontext.cart.totalQuantity != 0 && (
                  <Text style={[styles.itemsInCart]}>
                    {Productcontext.cart.totalQuantity}
                  </Text>
                )}
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="FavouritesScreen"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View>
              <Image
                resizeMode="contain"
                style={styles.tabIconImage}
                source={
                  focused
                    ? require('../assets/Images/BottomTabIcons/FavouriteSelected.png')
                    : require('../assets/Images/BottomTabIcons/Favourite.png')
                }
              />
              {Productcontext.favouriteProducts.length != 0 &&
                !focused &&
                Productcontext.favouriteProducts.length != 0 && (
                  <Text
                    style={[
                      styles.itemsInCart,
                      {
                        backgroundColor: themeColors.subcategoryBacgroundColor,
                        fontSize: 11,
                      },
                    ]}>
                    {Productcontext.favouriteProducts.length}
                  </Text>
                )}
            </View>
          ),
          title: 'Favourite',
        }}
      />
      <BottomTab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              style={styles.tabIconImage}
              source={
                focused
                  ? require('../assets/Images/BottomTabIcons/AccountSelected.png')
                  : require('../assets/Images/BottomTabIcons/Account.png')
              }
            />
          ),
          title: 'Account',
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconImage: {
    height: wp('6%'),
    width: wp('6%'),
  },
  itemsInCart: {
    fontFamily: fontFamilies.primarySemiBold,
    fontSize: 14,
    position: 'absolute',
    backgroundColor: themeColors.primaryGreen,
    color: themeColors.primaryBlack,
    paddingVertical: hp('0.2%'),
    paddingHorizontal: wp('2%'),
    borderRadius: 10,
    shadowRadius: 10,
    overflow: 'hidden',
    bottom: hp('2.3%'),
    left: hp('1%'),
    letterSpacing: 0.5,
  },
  loadingPage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'red',
    zIndex: 2,
  },
});
