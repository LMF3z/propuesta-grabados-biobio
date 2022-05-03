import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import themeTypes from './theme.types';
import productsTypes from './products.types';
import userTypes from './user.types';

export const StoreContext = createContext();

const INITIAL_STATE = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cartItem')
      ? JSON.parse(Cookies.get('cartItem'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {},
  },
  userInfo: Cookies.get('user_info')
    ? JSON.parse(Cookies.get('user_info'))
    : null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case themeTypes.DARK_MODE: {
      Cookies.set('darkMode', payload ? 'OFF' : 'ON');

      return {
        ...state,
        darkMode: !state.darkMode,
      };
    }

    case productsTypes.CART_ADD_ITEM: {
      const newItem = payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      Cookies.set('cartItem', JSON.stringify(cartItems));

      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    }

    case productsTypes.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== payload._id
      );

      Cookies.set('cartItem', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case userTypes.USER_LOGIN: {
      Cookies.set('user_info', JSON.stringify(payload));
      return {
        ...state,
        userInfo: payload,
      };
    }

    case userTypes.USER_LOGOUT: {
      Cookies.remove('user_info');
      Cookies.remove('cartItem');
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [] },
      };
    }

    case userTypes.SAVE_SHIPPING_ADDRESS: {
      Cookies.set('shippingAddress', JSON.stringify(payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: payload },
      };
    }

    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
