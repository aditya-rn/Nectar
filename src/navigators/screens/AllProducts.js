import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
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
import ReactNativeModal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LoadingPage from '../../components/LoadingPage';
import NoticeDiv from '../../components/NoticeDiv';
import ProductCardSmall from '../../components/ProductCardSmall';
import SearchBarBox from '../../components/SearchBarBox';
import {
  getAllProductWithPaging,
  localSearchBasedOnGivenArray,
  searchProductFromApi,
} from '../../data/ProductApiRequests';
import {ProductContext} from '../../data/ProductContext';
import {fontFamilies, themeColors} from '../../styles/Constants';
const screen = Dimensions.get('screen');

export default AllProducts = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const Productcontext = useContext(ProductContext);
  const [allProducts, setAllProducts] = useState({});
  const [isEndApi, setIsEndApi] = useState(false);
  const RenderAllProducts = ({item}) => {
    return (
      <ProductCardSmall
        productDetails={item}
        onpress={goToProductPage.bind(this, item)}
      />
    );
  };

  useEffect(() => {
    isFocused && init();
  }, []);

  const init = async () => {
    Productcontext.setIsLoading(true);
    const products = await getAllProductWithPaging();
    setAllProducts({...products.products, total: 10});
    // setTimeout(() => {
    Productcontext.setIsLoading(false);
    // }, 1000);
  };

  const getMoreProducts = async () => {
    console.log('running getMoreProducts');
    if (isEndApi) {
      return;
    }
    Productcontext.setIsLoading(true);
    let temp = {...allProducts};
    // console.log('temp');
    // console.log(temp);
    const products = await getAllProductWithPaging(
      allProducts.products.length,
      10,
    );
    if (products.products.products.length == 0) {
      setIsEndApi(true);
    } else {
      // console.log('temp.products');
      // console.log(temp.products);
      temp = {
        ...temp,
        products: [...temp.products, ...products.products.products],
        total: parseInt(temp.total) + 10,
      };
      // console.log('temp');
      // console.log(temp);
      setAllProducts({...temp});
    }
    Productcontext.setIsLoading(false);
  };

  const FlatListLoader = () => {
    if (Productcontext.isLoading && !!allProducts.products) {
      return (
        <ActivityIndicator
          style={{transform: [{scale: 1.1}]}}
          size={'small'}
          color={themeColors.primaryGreen}
        />
      );
    } else if (isEndApi && !Productcontext.isLoading) {
      return (
        <NoticeDiv
          text={'You reached end of page !!'}
          style={{alignSelf: 'center'}}
          fontColor={themeColors.starColor}
          fontFamily={fontFamilies.primarySemiBold}
        />
      );
    } else {
      return null;
    }
  };

  //search implementation
  const [searchedProducts, setSearchedProducts] = useState({
    total: 0,
    products: [],
  });
  const [noSearchedProductFound, setNoSearchedProductFound] = useState(false);
  const [searchText, setSearchText] = useState('');

  const searchProduct = async text => {
    setSearchText(text);
    setNoSearchedProductFound(false);
    if (!text) {
      cancelSearch();
      return;
    }
    // const productResponse = await searchProductFromApi(text);

    const productResponse = await localSearchBasedOnGivenArray(
      [...allProducts.products],
      text,
    );

    if (!!productResponse.isError) {
      Alert.alert('Oops', 'Error while searching !!');
      return;
    }
    if (productResponse.products.total == 0) {
      setNoSearchedProductFound(text);
      return;
    }
    setSearchedProducts({
      total: productResponse.products.total,
      products: [...productResponse.products.products],
    });
  };
  const cancelSearch = () => {
    setSearchText('');
    setNoSearchedProductFound(false);
    setSearchedProducts({
      total: 0,
      products: [],
    });
  };
  const cancelSearchByBtn = () => {
    if (searchedProducts.total == 0) {
      Keyboard.dismiss();
    } else {
      cancelSearch();
    }
  };
  const RenderSearchProducts = ({item}) => {
    return (
      <ProductCardSmall
        productDetails={item}
        onpress={goToProductPage.bind(this, {...item})}
      />
    );
  };
  const goToProductPage = product => {
    // console.log('product');
    // console.log(product);
    navigation.navigate('ProductDetailsScreen', {
      productObject: product,
    });
  };

  return (
    <>
      <View style={styles.page}>
        {Productcontext.isLoading && !allProducts.products && isFocused && (
          <Modal visible={true} transparent>
            <LoadingPage loadingText="Putting All Products .." />
          </Modal>
        )}
        <View style={styles.backBtnDiv}>
          <IconBtn
            name={'chevron-back'}
            size={30}
            color={'black'}
            onpress={() => navigation.goBack()}
          />
          <Text style={styles.pageHeading}>All Products</Text>
          <View style={styles.cartBtnDiv}>
            <IconBtn
              name={
                !!Productcontext.cart.totalQuantity ? 'cart' : 'cart-outline'
              }
              color={
                !!Productcontext.cart.totalQuantity
                  ? themeColors.primaryGreen
                  : themeColors.primaryBlack
              }
              size={35}
              onpress={() =>
                navigation.navigate('BottomTabNavigator', {
                  screen: 'CartScreen',
                })
              }
            />
            {!!Productcontext.cart.totalQuantity && (
              <Text style={styles.itemsInCart}>
                {Productcontext.cart.totalQuantity}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.searchBarDiv}>
          <SearchBarBox
            searchProduct={searchProduct}
            cancelSearch={cancelSearch}
            cancelSearchByBtn={cancelSearchByBtn}
            searchText={searchText}
          />
        </View>
        {searchedProducts.products.length != 0 && !noSearchedProductFound && (
          <FlatList
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            data={searchedProducts.products}
            renderItem={RenderSearchProducts}
            numColumns={2}
            columnWrapperStyle={{
              // backgroundColor: 'yellow',
              marginHorizontal: wp('5%'),
            }}
          />
        )}
        {!!noSearchedProductFound && (
          <NoticeDiv
            text={`No product found similar to "${noSearchedProductFound}" !!`}
            fontColor={themeColors.primaryBlack}
            style={styles.noProductFound}
          />
        )}
        {!noSearchedProductFound &&
          searchedProducts.products.length == 0 &&
          !!allProducts && (
            <FlatList
              data={allProducts.products}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              renderItem={RenderAllProducts}
              numColumns={2}
              columnWrapperStyle={{
                // backgroundColor: 'yellow',
                marginHorizontal: wp('5%'),
              }}
              contentContainerStyle={{
                paddingVertical: hp('2%'),
                paddingBottom: hp('5%'),
              }}
              onEndReached={getMoreProducts}
              onEndReachedThreshold={0.05}
              ListFooterComponent={<FlatListLoader />}
              ListFooterComponentStyle={styles.footerLoaderStyle}
            />
          )}

        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: themeColors.primaryBackground,
  },
  backBtnDiv: {
    marginTop: hp('7%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  pageHeading: {
    // backgroundColor: 'red',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fontFamilies.primaryBold,
    // marginVertical: hp('5%'),
    // marginTop: hp('7%'),
    // marginBottom: hp('2%'),
  },
  itemsInCart: {
    fontFamily: fontFamilies.primarySemiBold,
    fontSize: 14,
    backgroundColor: themeColors.primaryGreen,
    paddingVertical: hp('0.2%'),
    paddingHorizontal: hp('0.5%'),
    borderRadius: 10,
    shadowRadius: 10,
    overflow: 'hidden',
    letterSpacing: 0.5,
    position: 'absolute',
  },
  cartBtnDiv: {},

  searchBarDiv: {
    marginVertical: hp('1.5%'),
  },
  noProductFound: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp('2%'),
    fontFamily: fontFamilies.primarySemiBold,
  },
  footerLoaderStyle: {
    // backgroundColor: 'red',
    marginVertical: hp('1%'),
  },
});
