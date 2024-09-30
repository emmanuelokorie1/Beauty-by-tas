// actions/cartActions.ts
export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const incrementCount = (productid) => ({
  type: INCREMENT_COUNT,
  payload: productid,
});

export const decrementCount = (productid) => ({
  type: DECREMENT_COUNT,
  payload: productid,
});
