import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {
  Dimensions,
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
import IconBtn from '../../components/IconBtn';
import SimpleBtn from '../../components/SimpleBtn';
import TextButton from '../../components/TextButton';
import {fontFamilies, themeColors} from '../../styles/Constants';
const screen = Dimensions.get('screen');

export default OrderDoneScreen = () => {
  const navigation = useNavigation();
  const goToHomeScreen = () => {
    navigation.navigate('BottomTabNavigator', {
      screen: 'HomeScreen',
    });
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/Images/OrderDoneBackground.png')}
        style={styles.backgroundImage}>
        <SafeAreaView style={styles.orederDonePngDiv}>
          <Image
            source={require('../../assets/Images/OrderDone.png')}
            style={styles.orederDonePng}
          />
          <Text style={styles.textBig}>Your Order has been accepted</Text>
          <Text style={styles.textSmall}>
            Your items has been placcd and is on it’s way to being processed
          </Text>
          <View style={styles.trackBtnDiv}>
            <SimpleBtn title={'Track Order'} />
          </View>
          <View style={styles.backBtnDiv}>
            <TextButton
              title={'Back to home'}
              fontFamily={fontFamilies.primarySemiBold}
              fontSize={18}
              onpress={goToHomeScreen}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    // alignItems: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
  },
  orederDonePngDiv: {
    // backgroundColor: 'red',
  },
  orederDonePng: {
    height: hp('27%'),
    // backgroundColor: 'red',
    width: wp('65%'),
    marginLeft: wp('11%'),
    marginTop: hp('11%'),
  },
  textBig: {
    color: themeColors.primaryBlack,
    fontSize: 28,
    fontFamily: fontFamilies.primarySemiBold,
    // backgroundColor: 'red',
    marginHorizontal: wp('17%'),
    textAlign: 'center',
    lineHeight: hp('4%'),
    marginTop: hp('7.5%'),
  },
  textSmall: {
    color: themeColors.primaryGray,
    fontSize: 16,
    fontFamily: fontFamilies.primaryMedium,
    // backgroundColor: 'red',
    marginHorizontal: wp('16%'),
    textAlign: 'center',
    lineHeight: hp('2.5%'),
    marginTop: hp('2%'),
  },
  trackBtnDiv: {
    marginTop: hp('14%'),
  },
  backBtnDiv: {
    marginVertical: hp('2.5%'),
    alignSelf: 'center',
  },
});
