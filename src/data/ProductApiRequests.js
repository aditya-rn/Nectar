import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCT_API_URL = 'https://dummyjson.com/products';
const CART_URL = 'https://dummyjson.com/carts';

export const getAllCategories = async () => {
  try {
    const response = await fetch(`${PRODUCT_API_URL}/categories`);
    const categories = await response.json();
    return {
      isError: false,
      categories,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const getCategoryProducts = async categoryName => {
  try {
    const response = await fetch(`${PRODUCT_API_URL}/category/${categoryName}`);
    const products = await response.json();
    return {
      isError: false,
      products,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const getProduct = async id => {
  try {
    const response = await fetch(`${PRODUCT_API_URL}/${id}`);
    const product = await response.json();
    // console.log('product');
    // console.log(product);
    return {
      isError: false,
      product,
    };
  } catch (error) {
    // console.log('error');
    // console.log(error);
    return {
      isError: true,
      error,
    };
  }
};

export const getHomePageProducts = async () => {
  try {
    const response = await fetch(`${PRODUCT_API_URL}/categories`);
    let categories = await response.json();
    let categoryArray = [];
    for (let i = 0; i < 3; i++) {
      cat = categories[Math.floor(Math.random() * 10 + 10 - i)];
      categories.filter(item => item != cat);
      const productsResponse = await fetch(
        `${PRODUCT_API_URL}/category/${cat}`,
      );
      const products = await productsResponse.json();
      categoryArray.push({category: cat, products: [...products.products]});
    }

    return {
      isError: false,
      categoryArray,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const searchProductFromApi = async searchText => {
  try {
    const response = await fetch(`${PRODUCT_API_URL}/search?q=${searchText}`);
    // https://dummyjson.com/products/search?q=phone
    const products = await response.json();
    // console.log('products');
    // console.log(products);
    return {
      isError: false,
      products,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const addProductToCart = async (productArray, userID) => {
  //   console.log('{productArray, userID}');
  //   console.log({productArray, userID});
  try {
    const response = await fetch(`${CART_URL}/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userID,
        products: [...productArray],
      }),
    });
    const cart = await response.json();
    // console.log('productArray, cart.id');
    // console.log({productArray, id: cart.id});
    return {
      isError: false,
      cart,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const updateProductToCart = async (productArray, userID) => {
  try {
    const res2 = await fetch('https://dummyjson.com/carts/1', {
      method: 'PUT' /* or PATCH */,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        //   merge: true, // this will include existing products in the cart
        products: [...productArray],
      }),
    });

    let cart = await res2.json();
    for (let i = 0; i < cart.products.length; i++) {
      const res = await getProduct(cart.products[i].id);
      if (res.isError) {
        return res;
      } else {
        cart.products[i] = {...res.product, ...cart.products[i]};
      }
    }
    const cartStringified = JSON.stringify(cart);
    const storeToLocalStorage = await AsyncStorage.setItem(
      `${userID}cart`,
      cartStringified,
    );

    // const response = await fetch(`${CART_URL}/${cartID}`, {
    //   method: 'PUT' /* or PATCH */,
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     // this will include existing products in the cart
    //     products: [...productArray],
    //   }),
    // });
    // const cart = await response.json();
    // console.log('cart21');
    // console.log(cart);

    return {
      isError: false,
      cart,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const deleteCart = async () => {
  try {
    const response = await fetch(`${CART_URL}/1`, {
      method: 'DELETE',
    });
    const cart = await response.json();
    console.log('cart');
    console.log(cart);
    return {
      isError: false,
      cart,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const getAllProductWithPaging = async (skip = 0, limit = 10) => {
  try {
    const response = await fetch(
      `${PRODUCT_API_URL}?limit=${limit}&skip=${skip}`,
    );
    const products = await response.json();
    return {
      isError: false,
      products,
    };
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

export const localSearchBasedOnGivenArray = async (
  productArray = [],
  searchPattern = '',
) => {
  // console.log('{productArray, searchPattern}');
  // console.log({searchPattern});
  try {
    if (productArray.length == 0) {
      return {
        isError: true,
        error: 'Empty Array !!',
      };
    } else if (!searchPattern) {
      return {
        isError: true,
        error: 'Empty Search !!',
      };
    } else {
      let temp;
      let pattern = new RegExp(searchPattern, 'i');
      console.log('res');
      // let res = pattern.test(searchPattern);
      // console.log(res);

      temp = productArray.filter(
        item => pattern.test(item.title) || pattern.test(item.brand),
      );
      return {
        isError: false,
        products: {total: temp.length, products: temp},
      };
    }
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};
