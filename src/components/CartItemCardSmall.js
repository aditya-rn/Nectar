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
import {ProductContext} from '../data/ProductContext';
import {fontFamilies, themeColors} from '../styles/Constants';
import IconBtn from './IconBtn';
import ImageBtn from './ImageBtn';
export default CartItemCardSmall = ({
  cartItem,
  onpress,
  onPressAddBtn,
  onPressRemoveAll,
  onPressRemoveOne,
}) => {
  // console.log('cartItem');
  // console.log(cartItem);
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Pressable
      onPress={onpress}
      style={({pressed}) => [pressed && {opacity: 0.5}, {flex: 1}]}>
      <View style={styles.cartItemMainDiv}>
        <View>
          {imageLoading && (
            <ActivityIndicator
              size={'small'}
              style={styles.imageLoader}
              color={themeColors.primaryGreen}
            />
          )}
          <Image
            source={{uri: cartItem.thumbnail}}
            style={styles.cartItemImage}
            resizeMode="contain"
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>
        <View style={styles.detailDiv}>
          <View style={styles.detailsBar}>
            <View style={styles.itemDetailsDiv}>
              <Text style={styles.itemName}>{cartItem.title}</Text>
              <Text
                style={[
                  styles.quantityDetails,
                  {color: themeColors.primaryGreenLight},
                ]}>
                $ {cartItem.discountedPrice}, saved
              </Text>
            </View>
            <IconBtn
              name={'close'}
              color={themeColors.primaryGray}
              onpress={onPressRemoveAll.bind(this, cartItem.id)}
              size={30}
            />
          </View>
          <View style={styles.quantityAndPriceDiv}>
            <View style={styles.quantityControlDiv}>
              <ImageBtn
                image={require('../assets/Images/Remove.png')}
                height={hp('2%')}
                width={hp('2%')}
                borderRadius={15}
                borderColor={themeColors.productCardBorderColor}
                borderWidth={1}
                paddingVertical={hp('1.3%')}
                paddingHorizontal={hp('1.3%')}
                onpress={onPressRemoveOne.bind(this, cartItem.id)}
              />

              <Text style={styles.quantity}>{cartItem.quantity}</Text>
              <ImageBtn
                image={require('../assets/Images/AddToCartGreen.png')}
                height={hp('2%')}
                width={hp('2%')}
                borderColor={themeColors.productCardBorderColor}
                borderRadius={15}
                borderWidth={1}
                paddingVertical={hp('1.3%')}
                paddingHorizontal={hp('1.3%')}
                onpress={onPressAddBtn.bind(this, cartItem)}
              />
            </View>
            <Text style={styles.price}>$ {cartItem.total}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cartItemMainDiv: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    paddingVertical: hp('2.75%'),
  },
  cartItemImage: {
    // flex: 1,
    height: hp('10%'),
    // backgroundColor: 'yellow',
    width: wp('20%'),
    alignItems: 'center',
    marginVertical: hp('1%'),
    marginLeft: wp('5%'),
    marginRight: wp('2%'),
  },
  detailDiv: {
    flex: 1,
    // backgroundColor: 'green',
    marginHorizontal: wp('5%'),
  },
  detailsBar: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  itemDetailsDiv: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  itemName: {
    fontSize: 16,
    fontFamily: fontFamilies.primarySemiBold,
    color: themeColors.primaryBlack,
    marginVertical: hp('0.5%'),
    // backgroundColor: 'lightblue',
  },
  quantityDetails: {
    fontSize: 14,
    color: themeColors.primaryGray,
    fontFamily: fontFamilies.primaryMedium,
    marginVertical: hp('0.5%'),
    flex: 1,
    // backgroundColor: 'lightcoral',
  },
  quantityAndPriceDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('1%'),
    // backgroundColor: 'orange',
  },
  quantityControlDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'lightgreen',
    flex: 1,
  },
  quantity: {
    fontSize: 16,
    fontFamily: fontFamilies.primarySemiBold,
    color: themeColors.primaryBlack,
    marginHorizontal: wp('4%'),
    // backgroundColor: 'gray',
  },
  price: {
    fontSize: 18,
    fontFamily: fontFamilies.primaryBold,
    color: themeColors.primaryBlack,
    // backgroundColor: 'darkred',
  },
  imageLoader: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
    left: wp('3%'),
    bottom: 0,
    zIndex: -1,
  },
});
