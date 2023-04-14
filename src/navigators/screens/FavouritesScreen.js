import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {
  FlatList,
  Image,
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
import {fontFamilies, themeColors} from '../../styles/Constants';
import {ProductContext} from '../../data/ProductContext';
import {useContext, useEffect, useState} from 'react';
import CartItemCardSmall from '../../components/CartItemCardSmall';
import SimpleBtn from '../../components/SimpleBtn';
import FavouriteItemCardSmall from '../../components/FavouriteItemCardSmall';
import NoticeDiv from '../../components/NoticeDiv';
import TextButton from '../../components/TextButton';
import LoadingPage from '../../components/LoadingPage';

export default FavouritesScreen = () => {
  const navigation = useNavigation();
  const Productcontext = useContext(ProductContext);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);

  //   console.log('Productcontext.cart');
  //   console.log(Productcontext.cart);

  const goToProductPage = product => {
    navigation.navigate('ProductDetailsScreen', {
      productObject: product,
    });
  };
  const toggleFavorite = async (product, removeAll = false) => {
    setIsLoading(true);
    await Productcontext.toggleFavorite(product, removeAll);
    setIsLoading(false);
  };

  // useEffect(() => {
  //   setIsLoading(Productcontext.isLoading);
  // }, [Productcontext.isLoading, isFocused]);

  const addAllInCart = async () => {
    setIsLoading(true);
    await Productcontext.addAllFavouritesInCart();
    setIsLoading(false);
  };

  const renderFavouriteItems = ({item, index}) => {
    if (index == Productcontext.favouriteProducts.length - 1 && index > 4) {
      return (
        <View style={styles.lastItemDiv}>
          <FavouriteItemCardSmall
            productItem={item}
            onpress={goToProductPage.bind(this, item)}
          />
        </View>
      );
    } else {
      return (
        <FavouriteItemCardSmall
          productItem={item}
          onpress={goToProductPage.bind(this, item)}
        />
      );
    }
  };
  const FlatListSeperator = <View style={styles.flatlistSeparator}></View>;

  // favouriteProducts.length == 0

  return (
    <View style={styles.page}>
      {!!isLoading && isFocused && (
        <Modal transparent visible={isLoading} animationType="fade">
          <LoadingPage loadingText="Please wait .." />
        </Modal>
      )}
      <View style={styles.pageHeadingDiv}>
        {Productcontext.favouriteProducts.length != 0 && <View></View>}
        <Text
          style={[
            styles.pageHeading,
            Productcontext.favouriteProducts.length != 0 && {
              marginLeft: wp('20%'),
            },
          ]}>
          Favorites
        </Text>
        {Productcontext.favouriteProducts.length != 0 && (
          <TextButton
            title={'Remove All'}
            color={themeColors.starColor}
            marginHorizontal={wp('0.5%')}
            fontSize={16}
            fontFamily={fontFamilies.primarySemiBold}
            onpress={toggleFavorite.bind(this, {}, true)}
          />
        )}
      </View>
      {Productcontext.favouriteProducts.length != 0 && (
        <View style={styles.listDiv}>
          <FlatList
            data={Productcontext.favouriteProducts}
            renderItem={renderFavouriteItems}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={FlatListSeperator}
            style={styles.list}
            contentContainerStyle={params => {
              console.log('params');
              console.log(params);
            }}
          />
        </View>
      )}
      {!isLoading && Productcontext.favouriteProducts.length == 0 && (
        <View style={styles.noticeDiv}>
          <NoticeDiv
            text={'There is noting in Favourites !!'}
            fontSize={16}
            fontFamily={fontFamilies.primarySemiBold}
            fontColor={themeColors.primaryGray}
            paddingVertical={hp('1%')}
          />
          <NoticeDiv
            text={'Want to add one ?'}
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
      {!isLoading && Productcontext.favouriteProducts.length != 0 && (
        <View style={styles.addAllBtn}>
          <SimpleBtn title={'Add All To Cart'} onpress={addAllInCart} />
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
  tabIconImage: {
    height: wp('6%'),
    width: wp('6%'),
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
  addAllBtn: {
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
});
