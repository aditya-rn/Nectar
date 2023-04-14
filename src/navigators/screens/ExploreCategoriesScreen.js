import {useNavigation} from '@react-navigation/native';
import {
  Alert,
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
import SearchBarBox from '../../components/SearchBarBox';
import {DummyJson} from '../../data/DummyJson';
import {fontFamilies, themeColors} from '../../styles/Constants';
import CustomComponentBtn from '../../components/CustomComponentBtn';
import {useEffect, useState} from 'react';
import LoadingPage from '../../components/LoadingPage';
import {
  getAllCategories,
  getHomePageProducts,
} from '../../data/ProductApiRequests';
import NoticeDiv from '../../components/NoticeDiv';

export default ExploreCategoriesScreen = () => {
  const navigation = useNavigation();

  const goToCategoryProductsPage = category =>
    navigation.navigate('CategoryProductsScreen', {
      category,
    });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    // await getHomePageProducts();
    setIsLoading(true);
    const response = await getAllCategories();
    if (!!response.isError) {
      Alert.alert('Oops', 'Error while getting categories !!');
      setIsLoading(false);
      return;
    }
    setCategories([...response.categories]);
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const RenderCategory = ({item, index}) => {
    return (
      <CustomComponentBtn onpress={goToCategoryProductsPage.bind(this, item)}>
        <View
          style={[
            styles.categoryDiv,
            {borderColor: themeColors.categoriesColors[index % 8]},
          ]}>
          <View
            style={[
              styles.backgroundDummyDiv,
              {backgroundColor: themeColors.categoriesColors[index % 8]},
            ]}></View>
          {!!item.image && (
            <Image
              style={styles.categoryImage}
              resizeMode="contain"
              source={item.image}
            />
          )}
          <Text style={styles.categoryName}>{item}</Text>
        </View>
      </CustomComponentBtn>
    );
  };

  return (
    <View style={styles.page}>
      {!!isLoading && (
        <Modal transparent visible={isLoading} animationType="fade">
          <LoadingPage loadingText="Getting Categories ..." />
        </Modal>
      )}
      <Text style={styles.pageHeading}>Find Products</Text>
      <View style={styles.searchBarDiv}>
        <SearchBarBox />
      </View>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      {categories.length != 0 && !isLoading && (
        <View style={styles.categoryListDiv}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={categories}
            renderItem={RenderCategory}
            keyExtractor={(item, index) => index}
          />
        </View>
      )}
      {categories.length == 0 && !isLoading && (
        <NoticeDiv
          text={'No cateory found !!'}
          fontColor={themeColors.primaryGreen}
          style={styles.noticeDivStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: themeColors.primaryBackground,
  },
  pageHeading: {
    // backgroundColor: 'red',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fontFamilies.primaryBold,
    // marginVertical: hp('5%'),
    marginTop: hp('7%'),
    marginBottom: hp('2%'),
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
    justifyContent: 'center',
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
    textTransform: 'capitalize',
  },
  noticeDivStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
