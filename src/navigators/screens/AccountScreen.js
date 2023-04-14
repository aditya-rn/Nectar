import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
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
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import CustomComponentBtn from '../../components/CustomComponentBtn';
import IconBtn from '../../components/IconBtn';
import ImageBtn from '../../components/ImageBtn';
import LoadingPage from '../../components/LoadingPage';
import SimpleBtn from '../../components/SimpleBtn';
import {signInToGoogleApi} from '../../data/GoogleApiRequests';
import {UserAuthenticationContext} from '../../data/UserAuthenticationContext';
import {fontFamilies, themeColors} from '../../styles/Constants';

export default AccountScreen = () => {
  const Userauthenticationcontext = useContext(UserAuthenticationContext);
  // const logout = () => Usercontext.logout();

  const OrderComponent = () => (
    <CustomComponentBtn>
      <View style={styles.elementDiv}>
        <Image
          source={require('../../assets/Images/AccountPageIcons/Orders.png')}
          style={styles.elementImage}
          resizeMode="contain"
        />
        <Text style={styles.labelStyle}>Orders</Text>
        <IconBtn
          name={'chevron-forward'}
          size={22}
          marginHorizontal={wp('4.5%')}
        />
      </View>
    </CustomComponentBtn>
  );
  const MyDetails = () => (
    <CustomComponentBtn>
      <View style={styles.elementDiv}>
        <Image
          source={require('../../assets/Images/AccountPageIcons/Details.png')}
          style={styles.elementImage}
          resizeMode="contain"
        />
        <Text style={styles.labelStyle}>My Details</Text>
        <IconBtn
          name={'chevron-forward'}
          size={22}
          marginHorizontal={wp('4.5%')}
        />
      </View>
    </CustomComponentBtn>
  );
  const DeliveryAddress = () => (
    <CustomComponentBtn>
      <View style={styles.elementDiv}>
        <Image
          source={require('../../assets/Images/AccountPageIcons/Address.png')}
          style={styles.elementImage}
          resizeMode="contain"
        />
        <Text style={styles.labelStyle}>Delivery Address</Text>
        <IconBtn
          name={'chevron-forward'}
          size={22}
          marginHorizontal={wp('4.5%')}
        />
      </View>
    </CustomComponentBtn>
  );
  const PaymentMethods = () => (
    <CustomComponentBtn>
      <View style={styles.elementDiv}>
        <Image
          source={require('../../assets/Images/AccountPageIcons/Card.png')}
          style={styles.elementImage}
          resizeMode="contain"
        />
        <Text style={styles.labelStyle}>Payment Methods</Text>
        <IconBtn
          name={'chevron-forward'}
          size={22}
          marginHorizontal={wp('4.5%')}
        />
      </View>
    </CustomComponentBtn>
  );
  const PromoCord = () => (
    <CustomComponentBtn>
      <View style={styles.elementDiv}>
        <Image
          source={require('../../assets/Images/AccountPageIcons/Coupon.png')}
          style={styles.elementImage}
          resizeMode="contain"
        />
        <Text style={styles.labelStyle}>Promo Cord</Text>
        <IconBtn
          name={'chevron-forward'}
          size={22}
          marginHorizontal={wp('4.5%')}
        />
      </View>
    </CustomComponentBtn>
  );
  const Notifications = () => (
    <CustomComponentBtn>
      <View style={styles.elementDiv}>
        <Image
          source={require('../../assets/Images/AccountPageIcons/Notifications.png')}
          style={styles.elementImage}
          resizeMode="contain"
        />
        <Text style={styles.labelStyle}>Notifications</Text>
        <IconBtn
          name={'chevron-forward'}
          size={22}
          marginHorizontal={wp('4.5%')}
        />
      </View>
    </CustomComponentBtn>
  );
  const Help = () => (
    <CustomComponentBtn>
      <View style={styles.elementDiv}>
        <Image
          source={require('../../assets/Images/AccountPageIcons/Help.png')}
          style={styles.elementImage}
          resizeMode="contain"
        />
        <Text style={styles.labelStyle}>Help</Text>
        <IconBtn
          name={'chevron-forward'}
          size={22}
          marginHorizontal={wp('4.5%')}
        />
      </View>
    </CustomComponentBtn>
  );
  const About = () => (
    <CustomComponentBtn>
      <View style={styles.elementDiv}>
        <Image
          source={require('../../assets/Images/AccountPageIcons/About.png')}
          style={styles.elementImage}
          resizeMode="contain"
        />
        <Text style={styles.labelStyle}>About</Text>
        <IconBtn
          name={'chevron-forward'}
          size={22}
          marginHorizontal={wp('4.5%')}
        />
      </View>
    </CustomComponentBtn>
  );
  const LogOutBtn = () => (
    <View style={styles.logoutBtnDiv}>
      <CustomComponentBtn onpress={Userauthenticationcontext.logout}>
        <View style={styles.logoutBtn}>
          <Image
            source={require('../../assets/Images/AccountPageIcons/Exit.png')}
            style={styles.logoutImage}
          />
          <Text style={styles.logoutBtnText}>Log Out</Text>
        </View>
      </CustomComponentBtn>
    </View>
  );

  // const renderElements = ({item, index}) => {
  //   return item;
  // };

  const FlatListSeperator = () => (
    <View style={styles.flatlistSeparator}></View>
  );
  const SmallFlatListSeperator = () => (
    <View
      style={[
        styles.flatlistSeparator,
        {width: wp('90%'), alignSelf: 'center'},
      ]}></View>
  );

  return (
    <View style={styles.mainDiv}>
      {!!Userauthenticationcontext.isLoading && (
        <Modal
          transparent
          visible={Userauthenticationcontext.isLoading}
          animationType="fade">
          <LoadingPage loadingText="Signing Out ..." />
        </Modal>
      )}
      <View style={styles.accountDetailsDiv}>
        <Image
          source={
            !!Userauthenticationcontext.userDetails.photo
              ? {
                  uri: Userauthenticationcontext.userDetails.photo,
                }
              : require('../../assets/Images/CarotColorful.png')
          }
          style={styles.avatarImage}
          resizeMode="contain"
        />
        <View style={styles.mainDiv}>
          <View style={styles.nameDiv}>
            <Text style={styles.username}>
              {Userauthenticationcontext.userDetails.name}
            </Text>
            <ImageBtn
              image={require('../../assets/Images/AccountPageIcons/Edit.png')}
              height={hp('2%')}
              width={hp('2%')}
              paddingHorizontal={wp('3%')}
              //   backgroundColor={'red'}
            />
          </View>
          <Text style={styles.emailId}>
            {Userauthenticationcontext.userDetails.email}
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatListSeperator />
        <OrderComponent />
        <FlatListSeperator />
        <MyDetails />
        <SmallFlatListSeperator />
        <DeliveryAddress />
        <SmallFlatListSeperator />
        <PaymentMethods />
        <FlatListSeperator />
        <PromoCord />
        <FlatListSeperator />
        <Notifications />
        <FlatListSeperator />
        <Help />
        <FlatListSeperator />
        <About />
        <FlatListSeperator />
        <LogOutBtn />
        {/* <DummyDiv /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    backgroundColor: themeColors.primaryBackground,
  },
  accountDetailsDiv: {
    height: hp('15%'),
    // backgroundColor: 'red',
    marginTop: hp('3.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: wp('5%'),
  },
  avatarImage: {
    // flex: 1,
    height: hp('7%'),
    width: hp('7%'),
    marginHorizontal: wp('5%'),
    borderRadius: 27,
  },
  nameDiv: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: hp('0.5%'),
  },
  username: {
    fontSize: 20,
    fontFamily: fontFamilies.primaryBold,
    color: themeColors.primaryBlack,
  },
  emailId: {
    fontSize: 16,
    fontFamily: fontFamilies.primaryMedium,
    color: themeColors.primaryGray,
  },
  logoutImage: {
    height: hp('2.5%'),
    width: hp('2.5%'),
  },
  logoutBtnDiv: {
    // backgroundColor: 'red',
    // position: 'absolute',
    marginVertical: hp('5%'),
    alignSelf: 'center',
  },
  logoutBtn: {
    backgroundColor: '#F2F3F2',
    width: wp('90%'),
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('2.5%'),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtnText: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginRight: wp('8%'),
    color: themeColors.primaryGreen,
    fontFamily: fontFamilies.primarySemiBold,
    textAlignVertical: 'center',
  },
  flatlistSeparator: {
    borderBottomColor: themeColors.productCardBorderColor,
    borderBottomWidth: 2,
    // width: wp('90%'),
    // alignSelf: 'center',
  },
  elementDiv: {
    // backgroundColor: 'red',
    paddingVertical: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 18,
    fontFamily: fontFamilies.primarySemiBold,
    color: themeColors.primaryBlack,
    flex: 1,
  },
  elementImage: {
    height: hp('2.5%'),
    width: hp('2.5%'),
    marginHorizontal: wp('4.5%'),
  },
  dummyDiv: {
    backgroundColor: 'transparent',
    height: hp('30%'),
  },
});
