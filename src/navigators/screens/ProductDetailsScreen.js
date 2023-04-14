import {useNavigation, useRoute} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  // Share,
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
import Icon from 'react-native-vector-icons/Ionicons';
import CustomComponentBtn from '../../components/CustomComponentBtn';
import IconBtn from '../../components/IconBtn';
import ImageBtn from '../../components/ImageBtn';
import ProductImageSwiper from '../../components/ProductImageSwiper';
import SimpleBtn from '../../components/SimpleBtn';
import TextButton from '../../components/TextButton';
import {DummyJson} from '../../data/DummyJson';
import {ProductContext} from '../../data/ProductContext';
import {fontFamilies, themeColors} from '../../styles/Constants';
import {ShareOptions, Social} from 'react-native-share';
import Share from 'react-native-share';

export default ProductDetailsScreen = () => {
  const route = useRoute();
  const productObject = !!route.params
    ? route.params.productObject
    : {
        brand: 'Eastern Watches',
        category: 'womens-watches',
        description:
          'Elegant design, Stylish ,Unique & Trendy,Comfortable wear',
        discountPercentage: 3.23,
        id: 66,
        images: [
          'https://i.dummyjson.com/data/products/66/1.jpg',
          'https://i.dummyjson.com/data/products/66/2.jpg',
          'https://i.dummyjson.com/data/products/66/3.jpg',
          'https://i.dummyjson.com/data/products/66/4.JPG',
          'https://i.dummyjson.com/data/products/66/thumbnail.jpg',
        ],
        price: 35,
        rating: 4.79,
        stock: 24,
        thumbnail: 'https://i.dummyjson.com/data/products/66/thumbnail.jpg',
        title: 'Steel Analog Couple Watches',
      };
  const Productcontext = useContext(ProductContext);

  const [productDetails, setProductDetails] = useState(productObject);
  const [quantity, setQuantity] = useState(1);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const navigation = useNavigation();

  let productObjectdummy = {
    brand: 'Impression of Acqua Di Gio',
    category: 'fragrances',
    description:
      'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil',
    discountPercentage: 8.4,
    id: 11,
    images: [
      'https://i.dummyjson.com/data/products/11/1.jpg',
      'https://i.dummyjson.com/data/products/11/2.jpg',
      'https://i.dummyjson.com/data/products/11/3.jpg',
      'https://i.dummyjson.com/data/products/11/thumbnail.jpg',
    ],
    price: 13,
    rating: 4.26,
    stock: 65,
    thumbnail: 'https://i.dummyjson.com/data/products/11/thumbnail.jpg',
    title: 'perfume Oil',
  };

  useEffect(() => {
    if (!Productcontext.favouriteProducts) {
      return;
    }
    let ifExist = Productcontext.favouriteProducts
      .findIndex(item => item.id == productDetails.id)
      .toString();
    if (!!ifExist && ifExist != -1) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [Productcontext.favouriteProducts]);

  const toggleProductDetailsDiv = () => {
    setShowProductDetails(pre => !pre);
  };
  const incrementQuantity = () => {
    setQuantity(pre => parseInt(pre) + 1);
  };
  const decrementQuantity = () => {
    setQuantity(pre => {
      if (parseInt(pre) > 1) {
        return parseInt(pre) - 1;
      } else if (parseInt(pre) == 1) {
        Alert.alert('Oops', 'Already reached minimum quantity !!');
        return 1;
      } else {
        return 1;
      }
    });
  };
  const toggleFavourite = () => {
    console.log('productDetails');
    console.log(productDetails);
    Productcontext.toggleFavorite({...productDetails});
  };
  const addToBasket = () => {
    Productcontext.addToCart({
      ...productDetails,
      quantity,
    });
  };

  const QuntityAndPriceElement = (
    <View style={styles.priceAndQuantityDiv}>
      <View style={styles.quantityToAddDiv}>
        <ImageBtn
          image={require('../../assets/Images/Remove.png')}
          height={hp('2%')}
          width={hp('2%')}
          onpress={decrementQuantity}
        />
        <Text style={styles.quantityToAdd}>{quantity}</Text>
        <ImageBtn
          image={require('../../assets/Images/AddToCartGreen.png')}
          height={hp('2%')}
          width={hp('2%')}
          onpress={incrementQuantity}
        />
      </View>
      <Text style={styles.price}>
        {/* {productDetails.currency.toString()}  */}$ {productDetails.price}
      </Text>
    </View>
  );

  const ProductDetailsElement = (
    <CustomComponentBtn onpress={toggleProductDetailsDiv}>
      <View style={styles.elementMainDiv}>
        <View style={styles.headingDiv}>
          <Text style={styles.heading}>Product Details</Text>
          <Icon
            name={showProductDetails ? 'chevron-down' : 'chevron-forward'}
            size={25}
            color={themeColors.primaryBlack}
          />
        </View>
        {showProductDetails && (
          <Text style={styles.productDetails}>
            {productDetails.description}
          </Text>
        )}
      </View>
    </CustomComponentBtn>
  );

  const ReviewStars = () => {
    const rating = parseInt(productDetails.rating);
    const ReviewStarElemtArray = [];
    for (let i = 0; i < rating; i++) {
      const Element = (
        <IconBtn
          name={'star'}
          size={15}
          color={themeColors.starColor}
          marginHorizontal={wp('0.5%')}
        />
      );
      ReviewStarElemtArray.push(Element);
    }
    const ElemetToRender = (
      <View style={styles.reviewStartArray}>
        {ReviewStarElemtArray.map((item, index) => (
          <View key={index}>{item}</View>
        ))}
      </View>
    );
    return ElemetToRender;
  };

  const shareProduct = () => {
    // Share.shareSingle({
    //   title: 'Hello',
    //   message: 'some message',
    //   url: 'some share url',
    //   social: Share.Social.FACEBOOK,
    //   // whatsAppNumber: "9199999999",  // country code + phone number
    //   filename: 'test',
    // });
    // Share.share(
    //   {
    //     message: 'hello',
    //     title: 'product',
    //     url: 'http://',
    //   },
    //   {dialogTitle: 'Product2', subject: 'hello2', tintColor: 'blue'},
    // );
    Share.open({
      message:
        productDetails.title +
        ` in just ${productDetails.price}` +
        '\n' +
        productDetails.description,
      subject: `Checkout this ${productDetails.category} !!`,
      title: productDetails.title,
      type: productDetails.category,
      failOnCancel: false,
      urls: [...productDetails.images],
      filename: productDetails.title,
    });
  };

  const ReviewElement = (
    <View style={styles.elementMainDiv}>
      <View style={styles.headingDiv}>
        <Text style={styles.heading}>Rating</Text>
        <View style={styles.subDetailsDiv}>
          {/* <ReviewStars /> */}
          {/* <IconBtn
            name={'chevron-forward'}
            size={25}
            color={themeColors.primaryBlack}
          /> */}
          <Text style={styles.detail}>{productDetails.rating}</Text>
          <Icon
            name="star"
            color={themeColors.starColor}
            size={15}
            style={{marginTop: hp('-0.4')}}
          />
        </View>
      </View>
    </View>
  );

  const DiscountElement = (
    <View style={styles.elementMainDiv}>
      <View style={styles.headingDiv}>
        <Text style={styles.heading}>Discount</Text>
        <View style={styles.subDetailsDiv}>
          <Text style={styles.detail}>
            {productDetails.discountPercentage} %
          </Text>
          {/* <IconBtn
            name={'chevron-forward'}
            size={25}
            color={themeColors.primaryBlack}
          /> */}
        </View>
      </View>
    </View>
  );

  const FlatListSeperator = <View style={styles.flatlistSeparator}></View>;

  let FlatListContent = [
    QuntityAndPriceElement,
    ProductDetailsElement,
    DiscountElement,
    ReviewElement,
  ];

  const renderContent = ({item}) => item;

  return (
    <View style={styles.mainDiv}>
      {!!Productcontext.isLoading && (
        <Modal transparent visible={true} animationType="fade">
          <LoadingPage loadingText="Please wait .." />
        </Modal>
      )}
      <View style={styles.productImageSwiperDiv}>
        <ProductImageSwiper imagesArray={productDetails.images} />
      </View>
      <View style={styles.backBtnDiv}>
        <IconBtn
          name={'chevron-back'}
          size={30}
          marginHorizontal={wp('5%')}
          marginVertical={Platform.OS == 'ios' ? wp('12%') : wp('10%')}
          color={'black'}
          onpress={() => navigation.goBack()}
        />
        <View style={styles.cartBtnDiv}>
          <IconBtn
            name={!!Productcontext.cart.totalQuantity ? 'cart' : 'cart-outline'}
            color={
              !!Productcontext.cart.totalQuantity
                ? themeColors.primaryGreen
                : themeColors.primaryBlack
            }
            size={35}
            onpress={() => navigation.navigate('CartScreen')}
          />
          {!!Productcontext.cart.totalQuantity && (
            <Text style={styles.itemsInCart}>
              {Productcontext.cart.totalQuantity}
            </Text>
          )}
        </View>
      </View>
      <SafeAreaView style={styles.detailsPage}>
        <View style={styles.headingBar}>
          <Text style={styles.productName}>{productDetails.title}</Text>
          <ImageBtn
            image={
              isFavorite
                ? require(`../../assets/Images/Heart.png`)
                : require(`../../assets/Images/HeartOutline.png`)
            }
            height={hp('2.7%')}
            width={hp('2.7%')}
            onpress={toggleFavourite}
          />
        </View>
        {/* <Text style={styles.quantity}>
          {productDetails.quantity}
          {productDetails.parameters}, Price
        </Text> */}
        <View style={styles.flatListDiv}>
          <FlatList
            data={FlatListContent}
            renderItem={renderContent}
            keyExtractor={(item, index) => index + Math.random() * 100000}
            ItemSeparatorComponent={FlatListSeperator}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {!Productcontext.isLoading && (
          <View style={styles.shareBtnDiv}>
            <TextButton
              title={'Share'}
              backgroundColor={themeColors.primaryGray}
              paddingVertical={hp('2%')}
              fontFamily={fontFamilies.primarySemiBold}
              color={themeColors.primaryBackground}
              borderRadius={18}
              textStyle={{textAlign: 'center'}}
              fontSize={18}
              marginHorizontal={wp('1%')}
              onpress={shareProduct}
            />
          </View>
        )}
        {!Productcontext.isLoading && (
          <View style={styles.addToBasketBtnDiv}>
            <SimpleBtn title={'Add to Basket'} onpress={addToBasket} />
          </View>
        )}
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    backgroundColor: 'white',
    // backgroundColor: themeColors.whiteBackground,
    // backfaceVisibility: 0,
    flex: 1,
  },
  detailsPage: {
    flex: 1,
    // backgroundColor: 'red',
    marginTop: hp('-2.5%'),
    zIndex: -2,
    paddingHorizontal: wp('6.5%'),
  },
  productImageSwiperDiv: {
    height: hp('42%'),
    width: wp('100%'),
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
    // position: 'absolute',
    zIndex: -1,
  },
  backBtnDiv: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  itemsInCart: {
    fontFamily: fontFamilies.primarySemiBold,
    fontSize: 14,
    position: 'absolute',
    backgroundColor: themeColors.whiteBackground,
    paddingVertical: hp('0.2%'),
    paddingHorizontal: hp('0.5%'),
    borderRadius: 10,
    shadowRadius: 10,
    overflow: 'hidden',
    top: hp('-0.3%'),
    right: hp('-0.3%'),
    letterSpacing: 0.5,
  },
  headingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
    marginTop: Platform.OS == 'android' ? hp('0.5%') : 0,
  },
  productName: {
    fontSize: 22,
    fontFamily: fontFamilies.primaryBold,
    color: themeColors.primaryBlack,
    // backgroundColor: 'red',
    maxWidth: wp('75%'),
  },
  flatListDiv: {flex: 1},
  quantity: {
    color: themeColors.primaryGray,
  },
  priceAndQuantityDiv: {
    // backgroundColor: 'red',
    marginVertical: hp('3.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartBtnDiv: {
    marginHorizontal: wp('5%'),
    marginVertical: Platform.OS == 'ios' ? wp('12%') : wp('10%'),
  },
  quantityToAddDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityToAdd: {
    fontSize: 18,
    fontFamily: fontFamilies.primarySemiBold,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: hp('2%'),
    borderWidth: 1,
    borderColor: themeColors.productCardBorderColor,
    borderRadius: 15,
    flexDirection: 'row',
    color: themeColors.primaryBlack,
    marginHorizontal: wp('4%'),
  },
  price: {
    fontFamily: fontFamilies.primaryBold,
    fontSize: 22,
    color: themeColors.primaryBlack,
  },
  elementMainDiv: {},
  headingDiv: {
    marginVertical: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: fontFamilies.primarySemiBold,
    fontSize: 16,
    color: themeColors.primaryBlack,
  },
  productDetails: {
    color: themeColors.primaryGray,
    marginBottom: hp('2%'),
    lineHeight: hp('2.3%'),
    marginTop: hp('-1%'),
    fontFamily: fontFamilies.primaryMedium,
    fontSize: 13,
    letterSpacing: 0.2,
  },
  flatlistSeparator: {
    borderBottomColor: themeColors.productCardBorderColor,
    borderBottomWidth: 0.5,
  },
  subDetailsDiv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsInSmallBox: {
    fontSize: 10,
    backgroundColor: themeColors.productCardBorderColor,
    paddingVertical: hp('0.3%'),
    paddingHorizontal: wp('1%'),
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: wp('1%'),
  },
  detail: {
    fontSize: 14,
    paddingVertical: hp('0.3%'),
    paddingHorizontal: wp('1%'),
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: wp('1%'),
    alignSelf: 'center',
    fontFamily: fontFamilies.primaryMedium,
  },
  reviewStartArray: {
    flexDirection: 'row',
    marginRight: wp('2.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToBasketBtnDiv: {
    marginVertical: Platform.OS == 'android' ? hp('2%') : hp('0.5%'),
  },
  ProductDetailsScreen: {
    alignItems: 'center',
  },
});
