import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {
  Alert,
  FlatList,
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {DummyJson} from '../../data/DummyJson';
import {fontFamilies, themeColors} from '../../styles/Constants';
import ProductCardSmall from '../../components/ProductCardSmall';
import IconBtn from '../../components/IconBtn';
import ImageBtn from '../../components/ImageBtn';
import {getCategoryProducts} from '../../data/ProductApiRequests';
import {useContext, useEffect, useState} from 'react';
import LoadingPage from '../../components/LoadingPage';
import {ProductContext} from '../../data/ProductContext';

export default CategoryProductsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const Productcontext = useContext(ProductContext);
  const route = useRoute();
  let category = !!route.params
    ? route.params.category
    : DummyJson.categories[0];

  const goToProductPage = product => {
    navigation.navigate('ProductDetailsScreen', {
      productObject: product,
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const init = async () => {
    const response = await getCategoryProducts(category);
    if (!!response.isError) {
      setIsLoading(false);
      Alert.alert('Oops', 'Error while getting categories !!');
      return;
    }
    setProducts([...response.products.products]);
    setIsLoading(false);
    // setCategories([...response.categories]);
  };

  useEffect(() => {
    init();
  }, []);

  const RenderCategory = ({item, index}) => {
    return (
      <ProductCardSmall
        productDetails={item}
        key={item.index}
        onpress={goToProductPage.bind(this, item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      {!!Productcontext.isLoading && isFocused && (
        <Modal
          transparent
          visible={!!Productcontext.isLoading}
          animationType="fade">
          <LoadingPage loadingText="Cart shaking .." />
        </Modal>
      )}
      <View style={styles.pageHeadingDiv}>
        <IconBtn
          name={'chevron-back'}
          size={30}
          color={themeColors.primaryBlack}
          onpress={() => navigation.goBack()}
        />
        <Text style={styles.pageHeading}>{category}</Text>
        <ImageBtn
          image={require('../../assets/Images/Sort.png')}
          height={hp('2%')}
          width={hp('2%')}
          marginHorizontal={wp('1%')}
        />
      </View>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      {!isLoading && products.length != 0 && (
        <View style={styles.categoryListDiv}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={products}
            renderItem={RenderCategory}
            keyExtractor={(item, index) => index}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: themeColors.primaryBackground,
  },
  pageHeadingDiv: {
    // backgroundColor: 'red',

    marginHorizontal: wp('5%'),
    // marginTop: hp('7%'),
    marginVertical: hp('1.25%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageHeading: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fontFamilies.primaryBold,
    color: themeColors.primaryBlack,
  },
  searchBarDiv: {
    paddingVertical: hp('1%'),
  },
  categoryListDiv: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    marginTop: hp('1%'),
    // backgroundColor: 'red',
    // paddingBottom: hp('10%'),
  },
  categoryDiv: {
    flex: 1,
    // backgroundColor: 'yellow',
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
    // height: hp('22%'),
    borderRadius: 18,
    paddingHorizontal: wp('7%'),
    paddingVertical: hp('2%'),
    overflow: 'hidden',
    borderWidth: 1,
  },
  backgroundDummyDiv: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.25,
  },
  categoryImage: {
    // height: '100%',
    height: hp('13%'),
    width: wp('27%'),
    // backgroundColor: 'yellow',
    alignSelf: 'center',
  },
  categoryName: {
    fontFamily: fontFamilies.primaryBold,
    color: themeColors.primaryBlack,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: hp('2.2%'),
  },
});
