import {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {ProductContext} from '../data/ProductContext';
import {fontFamilies, themeColors} from '../styles/Constants';
import IconBtn from './IconBtn';
import ImageBtn from './ImageBtn';
export default FavouriteItemCardSmall = ({productItem, onpress}) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Pressable
      onPress={onpress}
      style={({pressed}) => [pressed && {opacity: 0.5}, {flex: 1}]}>
      <View style={styles.itemMainDiv}>
        <View>
          {imageLoading && (
            <ActivityIndicator
              size={'small'}
              style={styles.imageLoader}
              color={themeColors.primaryGreen}
            />
          )}
          <Image
            source={{uri: productItem.thumbnail}}
            style={styles.image}
            resizeMode="contain"
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>
        <View style={styles.detailsDiv}>
          <Text style={styles.heading}>{productItem.title}</Text>
          <Text style={styles.discount}>
            {productItem.discountPercentage}% off
          </Text>
        </View>
        <Text style={styles.price}>${productItem.price}</Text>
        <Icon
          name={'chevron-forward'}
          color={themeColors.primaryBlack}
          size={25}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemMainDiv: {
    // backgroundColor: 'yellow',
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsDiv: {
    // backgroundColor: 'green',
    flex: 1,
    marginHorizontal: wp('2%'),
  },
  image: {
    height: hp('7%'),
    width: wp('15%'),
    // backgroundColor: 'red',
    marginRight: wp('3%'),
  },
  price: {
    fontFamily: fontFamilies.primarySemiBold,
    fontSize: 16,
    paddingHorizontal: wp('1%'),
    color: themeColors.primaryBlack,

    // letterSpacing: 0.05,
  },
  heading: {
    paddingVertical: hp('0.5%'),
    fontFamily: fontFamilies.primaryBold,
    fontSize: 16,
    color: themeColors.primaryBlack,
  },
  discount: {
    paddingVertical: hp('0.5%'),
    fontFamily: fontFamilies.primaryMedium,
    fontSize: 14,
    color: themeColors.primaryGreenLight,
  },
  imageLoader: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
  },
});
