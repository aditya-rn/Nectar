import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {fontFamilies, themeColors} from '../styles/Constants';
export default LoadingPage = ({
  size,
  color = themeColors.primaryGreen,
  loadingText = 'Loading ...',
  textColor = themeColors.primaryGray,
}) => {
  return (
    // <View style={styles.loaderMainDiv}>
    <>
      <View style={styles.dummyDiv}></View>
      <View style={[styles.mainDiv]}>
        <View style={styles.loadingDiv}>
          <Text style={[styles.loadingText, {color: textColor}]}>
            {loadingText}
          </Text>
          <ActivityIndicator color={color} size={'large'} />
        </View>
      </View>
    </>
    // </View>
  );
};

const styles = StyleSheet.create({
  loaderMainDiv: {
    flex: 1,
    zIndex: 999,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  mainDiv: {
    position: 'absolute',
    // backgroundColor: 'red',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 2,
  },

  dummyDiv: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.8,
    // zIndex: -1,
  },
  loadingDiv: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: wp('70%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  loadingText: {
    // backgroundColor: 'yellow',
    marginBottom: hp('2%'),
    fontSize: 16,
    fontFamily: fontFamilies.primaryBold,
  },
});
