import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
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
import {ProductContext} from '../data/ProductContext';
import {fontFamilies, themeColors} from '../styles/Constants';
import AddToCardButtonSmall from './AddToCardButtonSmall';
import CustomComponentBtn from './CustomComponentBtn';

export default ProductCardSmall = ({productDetails, onpress}) => {
  const Productcontext = useContext(ProductContext);
  const [imageLoading, setImageLoading] = useState(true);
  const addToCart = () => {
    Productcontext.addToCart({
      ...productDetails,
      quantity: 1,
    });
  };
  // console.log('length');
  // console.log(length);
  return (
    <Pressable
      onPress={onpress}
      style={({pressed}) => [pressed && {opacity: 0.5}, {flex: 1}]}>
      <View style={[styles.mainDiv]}>
        <View>
          <Image
            source={{uri: productDetails.images[0]}}
            style={styles.productImage}
            resizeMode="contain"
            onLoadEnd={() => setImageLoading(false)}
            // borderRadius={15}
          />
          {imageLoading && (
            <ActivityIndicator
              size={'small'}
              style={styles.imageLoader}
              color={themeColors.primaryGreen}
            />
          )}
        </View>

        <Text style={styles.productName}>{productDetails.title}</Text>
        <Text style={styles.productQuantity}>
          {productDetails.discountPercentage}% discount
          {/* {productDetails.id} */}
        </Text>
        <View style={styles.priceAndAddBtn}>
          <Text style={styles.productPrice}>$ {productDetails.price}</Text>
          <AddToCardButtonSmall onpress={addToCart} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    // flex: 1,
    // backgroundColor: 'blue',
    marginVertical: hp('0.7%'),
    width: wp('42%'),
    marginHorizontal: wp('2%'),
    borderRadius: 18,
    borderWidth: 1,
    borderColor: themeColors.productCardBorderColor,
    // height: hp('28%'),
    paddingHorizontal: wp('3%'),
    alignSelf: 'center',
    // justifyContent: 'center',
    // justifyContent: 'space-between',
  },
  productImage: {
    // flex: 1,
    width: '100%',
    height: hp('10%'),
    marginVertical: hp('2%'),
    overflow: 'hidden',
  },
  productName: {
    fontFamily: fontFamilies.primaryBold,
    fontSize: 16,
    marginVertical: hp('1%'),
    color: themeColors.primaryBlack,
  },
  productQuantity: {
    fontFamily: fontFamilies.primaryMedium,
    color: themeColors.primaryGray,
    fontSize: 14,
  },
  priceAndAddBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp('1.5%'),
  },
  productPrice: {
    fontFamily: fontFamilies.primarySemiBold,
    color: themeColors.primaryBlack,
    fontSize: 18,
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
