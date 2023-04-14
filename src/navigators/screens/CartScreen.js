import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {
  Alert,
  FlatList,
  Image,
  Modal,
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
import {fontFamilies, themeColors} from '../../styles/Constants';
import {ProductContext} from '../../data/ProductContext';
import {useContext, useEffect, useState} from 'react';
import CartItemCardSmall from '../../components/CartItemCardSmall';
import SimpleBtn from '../../components/SimpleBtn';
import {getProduct} from '../../data/ProductApiRequests';
import LoadingPage from '../../components/LoadingPage';
import TextButton from '../../components/TextButton';
import {CheckOutDetailsItemBox} from '../../components/CheckOutDetailsItemBox';
import PrivacyPolicyBlock from '../../components/PrivacyPolicyBlock';
import IconBtn from '../../components/IconBtn';

export default CategoryProductsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const Productcontext = useContext(ProductContext);
  const [cart, setCart] = useState([]);
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);
  const [isOrderFailed, setisOrderFailed] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    // setIsLoading(true);
    if (!!Productcontext.cart && !!Productcontext.cart.products) {
      setCart([...Productcontext.cart.products]);
    } else {
      setCart([]);
    }
    // setIsLoading(false);
  }, [Productcontext.cart, isFocused]);

  // useEffect(() => {
  //   isFocused && setIsLoading(Productcontext.isLoading);
  // }, [Productcontext.isLoading]);

  // console.log('Productcontext.cart');
  // console.log(Productcontext.cart);

  const goToProductPage = product => {
    console.log('product');
    console.log(product);
    navigation.navigate('ProductDetailsScreen', {
      productObject: product,
    });
  };

  const AddOneMoreInCart = product => {
    const productToAdd = {
      ...product,
      quantity: 1,
    };
    Productcontext.addToCart({...productToAdd});
  };
  const RemoveOrder = id => {
    Productcontext.removeFromCart(id, true);
  };
  const RemoveOneMoreFromCart = productId => {
    console.log('productId');
    console.log(productId);
    Productcontext.removeFromCart(productId);
  };

  const renderCartItems = ({item, index}) => {
    // if (index == Productcontext.cart.length - 1 && index > 2) {
    //   return (
    //     <View style={styles.lastItemDiv}>
    //       <CartItemCardSmall
    //         cartItem={item}
    //         onpress={goToProductPage.bind(this, item)}
    //         onPressAddBtn={AddOneMoreInCart}
    //         onPressRemoveAll={RemoveOrder}
    //         onPressRemoveOne={RemoveOneMoreFromCart}
    //       />
    //     </View>
    //   );
    // } else {
    return (
      <CartItemCardSmall
        cartItem={item}
        onpress={goToProductPage.bind(this, item)}
        onPressAddBtn={AddOneMoreInCart}
        onPressRemoveAll={RemoveOrder}
        onPressRemoveOne={RemoveOneMoreFromCart}
      />
    );
    // }
  };
  const FlatListSeperator = <View style={styles.flatlistSeparator}></View>;

  const PlaceOrder = () => {
    setIsCheckoutClicked(false);
    !isOrderFailed && navigation.navigate('OrderDoneScreen');
    // setisOrderFailed(true);
  };

  const closeOrderFailedModal = () => {
    setisOrderFailed(false);
  };

  const toggleCheckoutModal = () => {
    setIsCheckoutClicked(pre => !pre);
  };
  const Heading = (
    <CheckOutDetailsItemBox
      detailName={'checkout'}
      isHeading
      rightIcon="close"
      onIconPress={toggleCheckoutModal}
    />
  );
  const DeliveryMethod = (
    <CheckOutDetailsItemBox
      detailName={'Delivery'}
      detailValue={'Select Method'}
    />
  );
  const PaymentDiv = (
    <CheckOutDetailsItemBox detailName={'Payment'} detailValue={'Visa'} />
  );
  const PromoCode = (
    <CheckOutDetailsItemBox
      detailName={'Promo Code'}
      detailValue={'Pick discount'}
    />
  );
  const TotalCost = (
    <CheckOutDetailsItemBox
      detailName={'Total Cost'}
      detailValue={!!cart.total ? cart.total : '$0'}
    />
  );
  const PrivacyPolicy = (
    <View style={styles.privacyPolicyBlock}>
      <PrivacyPolicyBlock
        frontText="By Placing an order you agree to our"
        firstBtn={'Terms'}
        SecondBtn={'Conditions'}
      />
    </View>
  );

  const CheckoutItemsArray = [
    DeliveryMethod,
    PaymentDiv,
    PromoCode,
    TotalCost,
    PrivacyPolicy,
  ];
  const RenderCheckoutListItems = ({item}) => item;

  return (
    <View style={styles.page}>
      {Productcontext.isLoading && isFocused && (
        <Modal
          transparent
          visible={Productcontext.isLoading}
          animationType="fade">
          <LoadingPage loadingText="Cart shaking .." />
        </Modal>
      )}

      {isCheckoutClicked && (
        <Modal transparent animationType="slide" visible={isCheckoutClicked}>
          <Pressable
            onPress={toggleCheckoutModal}
            style={styles.dummyDiv}></Pressable>
          <View style={styles.modalMainDiv}>
            {Heading}
            <FlatList
              data={CheckoutItemsArray}
              renderItem={RenderCheckoutListItems}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={FlatListSeperator}
              style={{
                borderTopWidth: 1,
                borderTopColor: themeColors.productCardBorderColor,
              }}
            />
            <View style={styles.placeOrderBtnDiv}>
              <SimpleBtn title={'Place Order'} onpress={PlaceOrder} />
            </View>
          </View>
        </Modal>
      )}

      {isOrderFailed && (
        <Modal visible={isOrderFailed} transparent animationType="fade">
          <View style={styles.orderFailedModalMainDiv}>
            <IconBtn
              name={'close'}
              color={themeColors.primaryBlack}
              size={30}
              marginVertical={hp('2%')}
              marginHorizontal={hp('2%')}
              onpress={closeOrderFailedModal}
            />
            <Image
              source={require('../../assets/Images/OrderFailed.png')}
              style={styles.orederFailedImage}
            />
            <Text
              style={[
                styles.textBig,
                {marginHorizontal: 0, marginTop: hp('3%')},
              ]}>
              Oops! Order Failed
            </Text>
            <Text style={[styles.textSmall]}>
              Something went teribly wrong.
            </Text>
            <View style={styles.btnDiv}>
              <View style={[styles.trackBtnDiv, {marginTop: hp(0)}]}>
                <SimpleBtn title={'Track Order'} btnWidth={wp('75%')} />
              </View>
              <View style={styles.backBtnDiv}>
                <TextButton
                  title={'Back to home'}
                  fontFamily={fontFamilies.primarySemiBold}
                  fontSize={18}
                />
              </View>
            </View>
          </View>

          <View style={styles.dummyDiv}></View>
        </Modal>
      )}
      <View style={styles.pageHeadingDiv}>
        {!!Productcontext.cart.total && Productcontext.cart.total != 0 && (
          <View></View>
        )}
        <Text
          style={[
            styles.pageHeading,
            !!Productcontext.cart.total &&
              Productcontext.cart.total != 0 && {
                marginLeft: wp('10%'),
              },
          ]}>
          My Cart
        </Text>
        {!!Productcontext.cart.total && Productcontext.cart.total != 0 && (
          <TextButton
            title={'Clear'}
            color={themeColors.starColor}
            marginHorizontal={wp('0.5%')}
            fontSize={16}
            fontFamily={fontFamilies.primarySemiBold}
            onpress={Productcontext.clearCart}
          />
        )}
      </View>
      {cart.length != 0 && (
        <View>
          <FlatList
            data={cart}
            renderItem={renderCartItems}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={FlatListSeperator}
            style={styles.list}
            contentContainerStyle={[
              cart.length > 3 && {paddingBottom: hp('25%')},
            ]}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {cart.length != 0 && !Productcontext.isLoading && (
        <View style={styles.checkoutBtnDiv}>
          <SimpleBtn
            title={'Go to Checkout'}
            rightText={
              Productcontext.cart.total != 0 && '$' + Productcontext.cart.total
            }
            onpress={toggleCheckoutModal}
          />
        </View>
      )}
      {cart.length == 0 && !Productcontext.isLoading && (
        <View style={styles.noticeDiv}>
          <NoticeDiv
            text={'There is noting in Cart !!'}
            fontSize={16}
            fontFamily={fontFamilies.primarySemiBold}
            fontColor={themeColors.primaryGray}
            paddingVertical={hp('1%')}
          />
          <NoticeDiv
            text={'Adding one will make cart happy :)'}
            fontSize={16}
            fontFamily={fontFamilies.primarySemiBold}
            fontColor={themeColors.primaryGray}
          />
          <TextButton
            title={'Explore'}
            fontSize={18}
            color={themeColors.primaryGreen}
            marginVertical={15}
            onpress={() => navigation.navigate('HomeScreen')}
          />
        </View>
      )}
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: themeColors.primaryBackground,
  },
  dummyDiv: {
    backgroundColor: themeColors.primaryBlack,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0.4,
    zIndex: -1,
  },
  modalMainDiv: {
    backgroundColor: themeColors.primaryBackground,
    position: 'absolute',
    top: hp('40%'),
    bottom: hp('0%'),
    right: wp('0%'),
    left: wp('0%'),
    // left: wp('0%'),
    borderRadius: 18,
  },
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
    bottom: hp('1.5%'),
    left: hp('1%'),
    letterSpacing: 0.5,
  },
  pageHeadingDiv: {
    // backgroundColor: 'red',

    marginHorizontal: wp('5%'),
    marginTop: hp('7%'),
    marginVertical: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageHeading: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fontFamilies.primaryBold,
    color: themeColors.primaryBlack,
    flex: 1,
  },
  list: {
    // flex: 1,
    borderTopColor: themeColors.productCardBorderColor,
    borderTopWidth: 1,
    borderBottomColor: themeColors.productCardBorderColor,
    borderBottomWidth: 1,
  },
  flatlistSeparator: {
    borderBottomColor: themeColors.productCardBorderColor,
    borderBottomWidth: 2,
    width: wp('90%'),
    alignSelf: 'center',
  },
  checkoutBtnDiv: {
    position: 'absolute',
    bottom: hp('2.5%'),
    alignSelf: 'center',
  },
  noticeDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastItemDiv: {
    marginBottom: hp('25%'),
  },
  privacyPolicyBlock: {
    // backgroundColor: 'red',
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
  },
  placeOrderBtnDiv: {
    marginBottom: hp('4%'),
  },
  orderFailedModalMainDiv: {
    backgroundColor: themeColors.primaryBackground,
    position: 'absolute',
    top: hp('21%'),
    bottom: hp('12%'),
    right: wp('5.5%'),
    left: wp('5.5%'),
    // left: wp('0%'),
    borderRadius: 18,
  },
  orederFailedImage: {
    height: hp('27%'),
    width: hp('27%'),
    alignSelf: 'center',
  },
  btnDiv: {
    marginTop: hp('5%'),
    // backgroundColor: 'red',
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
