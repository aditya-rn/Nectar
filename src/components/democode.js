import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleBtn from '../../components/SimpleBtn';
import {fontFamilies, themeColors} from '../../styles/Constants';
export default democode = () => {
  return (
    <View>
      <Text>democode</Text>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
