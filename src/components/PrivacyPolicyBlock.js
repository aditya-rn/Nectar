import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {fontFamilies, themeColors} from '../styles/Constants';
import TextButton from './TextButton';
export default PrivacyPolicyBlock = ({
  frontText = 'By continuing you agree to our',
  firstBtn = 'Terms of Services',
  SecondBtn = 'Privacy Policy',
}) => {
  const goToTermsOfService = () => {};
  const goToPrivacyPolicy = () => {};

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.normalText}>{frontText}</Text>
      <TouchableOpacity onPress={goToTermsOfService} activeOpacity={0.5}>
        <Text style={styles.textBtn}> {firstBtn} </Text>
      </TouchableOpacity>
      <Text style={styles.normalText}>and </Text>
      <TouchableOpacity onPress={goToPrivacyPolicy} activeOpacity={0.5}>
        <Text style={styles.textBtn}>{SecondBtn}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    // display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  normalText: {
    marginVertical: hp('0.5%'),
    color: themeColors.primaryGray,
    fontFamily: fontFamilies.primaryMedium,
    letterSpacing: 0.5,
  },
  textBtn: {
    marginVertical: hp('0.5%'),
    color: themeColors.primaryGreen,
    fontFamily: fontFamilies.primaryMedium,
    letterSpacing: 0.5,
  },
});
