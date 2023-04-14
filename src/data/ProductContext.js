import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {Alert} from 'react-native';
import {
  addProductToCart,
  getCart,
  updateProductToCart,
} from './ProductApiRequests';
import {UserAuthenticationContext} from './UserAuthenticationContext';
let cartOutside = {};

export const ProductContext = createContext({
  favouriteProducts: [],
  toggleFavorite: async (product, removeAll = false) => {},
  cart: {},
  addToCart: async product => {},
  removeFromCart: async (productId, removeAll = false) => {},
  addAllFavouritesInCart: async () => {},
  isLoading: false,
  setIsLoading: loadingState => {},
  clearCart: async () => {},
});

const cartReducerFunc = async (state, action) => {
  switch (action.type) {
    case 'ADD':
      // const totalPriceToAdd = Number(
      //   (
      //     Number(action.data.product.productsQuantityToAdd) *
      //     Number(action.data.product.price)
      //   ).toFixed(3),
      // );
      // let tempcart = [...state];

      // if (!!state && state.length == 0) {
      //   // empty cart
      //   action.func.setTotalInCart(
      //     Number(action.data.product.productsQuantityToAdd),
      //   );
      //   action.func.settotalAmount(totalPriceToAdd);
      //   const totalAmountOfSameProducts = Number(
      //     (
      //       Number(action.data.product.price) *
      //       Number(action.data.product.productsQuantityToAdd)
      //     ).toFixed(3),
      //   );
      //   return [
      //     {...action.data.product, orderPrice: totalAmountOfSameProducts},
      //   ];
      // } else if (!!state && state.length != 0) {
      //   //not an empty cart

      //   let ifExist = tempcart
      //     .findIndex(
      //       element => element.productId == action.data.product.productId,
      //     )
      //     .toString();

      //   if (!!ifExist && Number(ifExist) == -1) {
      //     // item not exist
      //     action.func.setTotalInCart(
      //       pre =>
      //         Number(pre) + Number(action.data.product.productsQuantityToAdd),
      //     );
      //     action.func.settotalAmount(pre =>
      //       Number((Number(pre) + totalPriceToAdd).toFixed(3)),
      //     );
      //     const totalAmountOfSameProducts = Number(
      //       (
      //         Number(action.data.product.price) *
      //         Number(action.data.product.productsQuantityToAdd)
      //       ).toFixed(3),
      //     );
      //     return [
      //       {...action.data.product, orderPrice: totalAmountOfSameProducts},
      //       ...state,
      //     ];
      //   }
      //   // item  exist
      //   tempcart = tempcart.map(element => {
      //     if (element.productId == action.data.product.productId) {
      //       // changing the quantity

      //       const totalAmountOfSameProducts = Number(
      //         (totalPriceToAdd + Number(element.orderPrice)).toFixed(3),
      //       );
      //       const totalquantity =
      //         Number(element.productsQuantityToAdd) +
      //         Number(action.data.product.productsQuantityToAdd);
      //       return {
      //         ...element,
      //         productsQuantityToAdd: totalquantity,
      //         orderPrice: totalAmountOfSameProducts,
      //       };
      //     } else {
      //       return {...element};
      //     }
      //   });
      //   action.func.setTotalInCart(
      //     pre =>
      //       Number(pre) + Number(action.data.product.productsQuantityToAdd),
      //   );
      //   action.func.settotalAmount(pre =>
      //     Number((Number(pre) + totalPriceToAdd).toFixed(3)),
      //   );

      //   return [...tempcart];
      // }
      break;

    case 'REMOVE':
      tempcart = [];
      state.map(item => {
        if (item.productId == action.data.productId) {
          action.func.settotalAmount(pre =>
            Number((pre - Number(Number(item.price).toFixed(3))).toFixed(3)),
          );
          action.func.setTotalInCart(pre => Number(pre - 1));

          if (item.productsQuantityToAdd > 1) {
            const newOrderPrice = Number(
              (
                Number(item.orderPrice) - Number(Number(item.price).toFixed(3))
              ).toFixed(3),
            );
            const newQUantity = Number(item.productsQuantityToAdd) - 1;
            tempcart.push({
              ...item,
              orderPrice: newOrderPrice,
              productsQuantityToAdd: newQUantity,
            });
          }

          // return null;
        } else {
          tempcart.push({...item});
        }
      });
      return [...tempcart];

    case 'REMOVE ALL':
      tempcart = [];
      state.map(item => {
        if (item.productId == action.data.productId) {
          const totalPriceToRemove = Number(
            (Number(item.productsQuantityToAdd) * Number(item.price)).toFixed(
              3,
            ),
          );
          action.func.settotalAmount(pre =>
            Number((pre - totalPriceToRemove).toFixed(3)),
          );
          action.func.setTotalInCart(pre =>
            Number(pre - Number(item.productsQuantityToAdd)),
          );
          // return null;
        } else {
          tempcart.push({...item});
        }
      });
      return [...tempcart];
    default:
      break;
  }
};

export const ProductContextProvider = ({children}) => {
  const [favouriteProducts, setfavouriteProducts] = useState([]);
  // const [cart, cartDispatch] = useReducer(cartReducerFunc, [
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const Userauthenticationcontext = useContext(UserAuthenticationContext);

  const toggleFavorite = async (product, removeAll = false) => {
    try {
      setIsLoading(true);
      let arrayToSet = [];
      if (removeAll) {
        setfavouriteProducts([]);
        const storeToLocalStorage = await AsyncStorage.removeItem(
          `${Userauthenticationcontext.userDetails.id}favorites`,
        );
        setIsLoading(false);
        return;
      }
      if (favouriteProducts.length == 0) {
        arrayToSet = [{...product}];
      } else {
        let ifExist = favouriteProducts
          .findIndex(element => element.id == product.id)
          .toString();
        if (!!ifExist && Number(ifExist) == -1) {
          arrayToSet = [{...product}, ...favouriteProducts];
        } else {
          arrayToSet = favouriteProducts.filter(
            element => element.id != product.id,
          );
        }
      }
      setfavouriteProducts([...arrayToSet]);
      const arrayStringified = JSON.stringify([...arrayToSet]);
      const storeToLocalStorage = await AsyncStorage.setItem(
        `${Userauthenticationcontext.userDetails.id}favorites`,
        arrayStringified,
      );
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Oops', 'Error while saving item !!');
    }
  };

  useEffect(() => {
    // setIsLoading(true);
    if (Userauthenticationcontext.isAuthenticated) {
      getInitialCart();
      getInitialFavorutes();
    } else {
      setCart({});
      setfavouriteProducts([]);
      setIsLoading(false);
    }
  }, [Userauthenticationcontext.isAuthenticated]);

  const getInitialCart = async () => {
    setIsLoading(true);
    const storedCart = await AsyncStorage.getItem(
      `${Userauthenticationcontext.userDetails.id}cart`,
    );
    const cartObject = JSON.parse(storedCart);
    if (!!storedCart) {
      cartOutside = {...cartObject};
      setCart({...cartOutside});
    }
    setIsLoading(false);
  };

  const getInitialFavorutes = async () => {
    setIsLoading(true);
    const storedFavs = await AsyncStorage.getItem(
      `${Userauthenticationcontext.userDetails.id}favorites`,
    );
    const favObject = JSON.parse(storedFavs);
    if (!!storedFavs) {
      setfavouriteProducts([...favObject]);
    }
    setIsLoading(false);
  };

  // console.log('cart');
  // console.log(cart);
  // console.log('cart');
  // console.log(cart);
  const addToCart = async product => {
    // await cartDispatch({
    //   type: 'ADD',
    //   data: {product},
    //   func: {setTotalInCart, settotalAmount},
    // });
    setIsLoading(true);
    let temp = [];
    if (!!cartOutside.products) {
      temp = [...cartOutside.products];
      let indexOfElement = -1;
      temp.map((ele, index) => {
        if (ele.id == product.id) {
          indexOfElement = index;
        }
      });
      if (indexOfElement != -1) {
        temp[indexOfElement] = {
          id: product.id,
          quantity: temp[indexOfElement].quantity + product.quantity,
          thumbnail: product.thumbnail,
        };
      } else {
        temp.unshift({
          id: product.id,
          quantity: product.quantity,
          thumbnail: product.thumbnail,
        });
      }
    } else {
      temp.push({
        id: product.id,
        quantity: product.quantity,
        thumbnail: product.thumbnail,
      });
    }
    const addRequest = await updateProductToCart(
      [...temp],
      Userauthenticationcontext.userDetails.id,
      Userauthenticationcontext.userDetails.id,
    );
    setIsLoading(false);
    if (addRequest.isError) {
      Alert.alert('Oops', 'Error while adding products in cart !!');
      return;
    }
    cartOutside = {...addRequest.cart};
    setCart({...cartOutside});
  };

  const removeFromCart = async (productId, removeAll = false) => {
    setIsLoading(true);
    let updatedArray;
    if (!!removeAll) {
      // cartDispatch({
      //   type: 'REMOVE ALL',
      //   data: {productId},
      //   func: {setTotalInCart, settotalAmount},
      // });

      updatedArray = cartOutside.products.filter(item => item.id != productId);
    } else {
      // cartDispatch({
      //   type: 'REMOVE',
      //   data: {productId},
      //   func: {setTotalInCart, settotalAmount},
      // });

      updatedArray = cartOutside.products.map((item, index) => {
        if (item.id == productId) {
          if (parseInt(item.quantity) > 1) {
            return {
              ...item,
              quantity: parseInt(item.quantity) - 1,
            };
          }
        } else {
          return {...item};
        }
      });
    }
    if (!!updatedArray) {
      const response = await updateProductToCart(
        [...updatedArray],
        Userauthenticationcontext.userDetails.id,
      );
      if (response.isError) {
        Alert.alert('Oops', 'Error while updating cart !!');
      } else {
        cartOutside = {...response.cart};
        setCart({...cartOutside});
      }
    } else {
      cartOutside = {};
      setCart({});
      try {
        const removeCartFromLocalStorage = await AsyncStorage.removeItem(
          `${Userauthenticationcontext.userDetails.id}cart`,
        );
      } catch (error) {
        Alert.alert('Oops', 'Error while removing cart !!');
      }
    }
    setIsLoading(false);
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      const removeFromLocalStorage = await AsyncStorage.removeItem(
        `${Userauthenticationcontext.userDetails.id}cart`,
      );
      cartOutside = {};
      setCart({});
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Oops', 'Error whlie clearing cart !!');
      setIsLoading(false);
    }
  };

  const addAllFavouritesInCart = async (i = 0) => {
    // let arrayToSet = [];
    // setIsLoading(true);
    // for (let i = 0; i < favouriteProducts.length; i++) {
    //   arrayToSet.push({...favouriteProducts[i], quantity: 1});
    // }
    // const response = await updateProductToCart(
    //   [...arrayToSet],
    //   Userauthenticationcontext.userDetails.id,
    // );
    // if (response.isError) {
    //   Alert.alert('Oops', 'Error while adding items !!');
    // } else {
    //   setCart({...response.cart});
    // }
    // setIsLoading(false);
    for (let i = 0; i < favouriteProducts.length; i++) {
      await addToCart({...favouriteProducts[i], quantity: 1});
    }
  };

  const contextValues = {
    favouriteProducts,
    toggleFavorite,
    cart,
    addToCart,
    removeFromCart,
    addAllFavouritesInCart,
    isLoading,
    setIsLoading,
    clearCart,
  };

  return (
    <ProductContext.Provider value={contextValues}>
      {children}
    </ProductContext.Provider>
  );
};
