import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  ScrollView,
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
import AdImageSlider from '../../components/AdImageSlider';
import SearchBarBox from '../../components/SearchBarBox';
import {DummyJson} from '../../data/DummyJson';
import {fontFamilies, themeColors} from '../../styles/Constants';
import TextButton from '../../components/TextButton';
import ProductCardSmall from '../../components/ProductCardSmall';
import SubcategorycardSmall from '../../components/SubcategorycardSmall';
import CustomComponentBtn from '../../components/CustomComponentBtn';
import {ProductContext} from '../../data/ProductContext';
import {
  getHomePageProducts,
  searchProductFromApi,
} from '../../data/ProductApiRequests';
import NoticeDiv from '../../components/NoticeDiv';
import LoadingPage from '../../components/LoadingPage';

export default HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const Productcontext = useContext(ProductContext);
  const [categoriesObjects, setCategoriesObjects] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState({
    total: 0,
    products: [],
  });
  const [noSearchedProductFound, setNoSearchedProductFound] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    Productcontext.setIsLoading(true);
    isFocused && init();
  }, []);

  const init = async () => {
    const response = await getHomePageProducts();
    if (!!response.isError) {
      Alert.alert('Oops', 'Error while getting categories !!');
      setIsLoading(false);
      return;
    }
    setCategoriesObjects([...response.categoryArray]);
    Productcontext.setIsLoading(false);
  };

  const goToAllProducts = () => {
    navigation.navigate('AllProducts');
  };

  const goToProductPage = product => {
    // console.log('product');
    // console.log(product);
    navigation.navigate('ProductDetailsScreen', {
      productObject: product,
    });
  };

  const RenderCategory = ({data}) => {
    return (
      <View style={styles.categoryDiv}>
        <View style={styles.categoryHeadingDiv}>
          <Text style={styles.categoryHeading}>{data.category}</Text>
          <TextButton
            title={'See all'}
            color={themeColors.primaryGreen}
            fontSize={16}
            onpress={goToAllProducts}
          />
        </View>
        {/* {!!data.subcategory && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.subcategory.map((subcategoryItem, cardIndex) => (
              <RenderSubcategory
                data={subcategoryItem}
                key={cardIndex}
                length={data.subcategory.length}
                cardIndex={cardIndex}
              />
            ))}
          </ScrollView>
        )} */}
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.products.map((item, index) => (
            <RenderProducts
              productDetails={item}
              productIndex={index}
              key={index}
              length={data.products.length}
            />
          ))}
        </ScrollView> */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item, index) => index}
          data={data.products}
          renderItem={({item, index}) => (
            <RenderProducts productDetails={item} key={index} />
          )}
        />
        {/* <FlatList data={data.items} renderItem={renderProducts} /> */}
      </View>
    );
  };
  // const RenderSubcategory = ({data, cardIndex, length}) => {
  //   return (
  //     <SubcategorycardSmall
  //       name={data.name}
  //       image={data.images[0]}
  //       cardIndex={cardIndex}
  //       length={length}
  //     />
  //   );
  // };
  const RenderProducts = ({productDetails}) => {
    return (
      <ProductCardSmall
        productDetails={productDetails}
        onpress={goToProductPage.bind(this, {...productDetails})}
      />
    );
  };

  const searchProduct = async text => {
    setSearchText(text);
    setNoSearchedProductFound(false);
    if (!text) {
      cancelSearch();
      return;
    }
    const productResponse = await searchProductFromApi(text);
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

  useEffect(() => {
    let test = [
      {
        id: 1,
        name: 'abc',
      },
      {
        id: 2,
        name: 'abz',
      },
      {
        id: 3,
        name: 'xyz',
      },
    ];

    let filteredData = test.filter(item => {
      let searchText = 'z';
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    console.log({filteredData});
  }, []);

  return (
    <View style={styles.page}>
      {!!Productcontext.isLoading && isFocused && (
        <Modal visible={true} transparent>
          <LoadingPage loadingText="Please wait .." />
        </Modal>
      )}
      <Image
        source={require('../../assets/Images/CarotColorful.png')}
        style={styles.carotLogo}
        resizeMode="contain"
      />
      <View style={styles.locationDiv}>
        <Image
          source={require('../../assets/Images/Location.png')}
          style={styles.locationIcon}
          resizeMode="contain"
        />
        <Text style={styles.locationText}>Dhaka, Banassre</Text>
      </View>
      <View style={styles.searchBarDiv}>
        <SearchBarBox
          searchProduct={searchProduct}
          cancelSearch={cancelSearch}
          cancelSearchByBtn={cancelSearchByBtn}
          searchText={searchText}
        />
      </View>
      {categoriesObjects.length != 0 &&
        searchedProducts.products.length == 0 &&
        !noSearchedProductFound && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.adDiv}>
              <AdImageSlider />
            </View>
            {categoriesObjects.map((obj, index) => (
              <RenderCategory data={obj} key={index} />
            ))}
          </ScrollView>
        )}
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
  carotLogo: {
    // backgroundColor: 'red',
    alignSelf: 'center',
    height: hp('4%'),
    width: wp('7%'),
    marginTop: hp('6%'),
    // marginLeft: 20,
  },
  locationDiv: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    // alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('0.5%'),
  },
  locationIcon: {
    // backgroundColor: 'red',
    // alignSelf: 'center',
    height: '100%',
    width: wp('4%'),
    marginBottom: hp('0.5%'),
  },
  locationText: {
    fontSize: 18,
    // backgroundColor: 'red',
    fontFamily: fontFamilies.primaryMedium,
    marginHorizontal: wp('2%'),
    alignItems: 'center',
    textAlignVertical: 'top',
    paddingVertical: hp('0.5%'),
    color: themeColors.primaryBlack,
  },
  searchBarDiv: {
    marginVertical: hp('1.5%'),
  },
  adDiv: {
    width: wp('90%'),
    height: hp('13%'),
    // backgroundColor: 'red',
    marginVertical: hp('1%'),
    alignSelf: 'center',
  },
  categoryDiv: {
    // backgroundColor: 'red',
    marginVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    // height: hp('35%'),
  },
  categoryHeadingDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
    width: '100%',
  },
  categoryHeading: {
    fontSize: 24,
    fontFamily: fontFamilies.primarySemiBold,
    color: themeColors.primaryBlack,
    marginVertical: hp('1.5%'),
  },
  noProductFound: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp('2%'),
    fontFamily: fontFamilies.primarySemiBold,
  },
});
