import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../types/commonTypes'; // Make sure to have this type defined

interface CartState {
  carts: ProductType[];
}

// Initial state
const initialState: CartState = {
  carts: JSON.parse(localStorage.getItem('cartItems') || '[]'), // Load from localStorage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const itemExists = state.carts.some(
        (cartItem) => cartItem.productid === action.payload.productid
      );
      
      if (itemExists) {
        // Increment count if item exists
        state.carts = state.carts.map(cartItem =>
          cartItem.productid === action.payload.productid
            ? { ...cartItem, count: (cartItem.count || 1) + 1 } // Ensure count is initialized
            : cartItem
        );
      } else {
        // Initialize count to 1 for a new item
        state.carts.push({ ...action.payload, count: 1 });
      }
      
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.carts));
    },
    incrementCount: (state, action: PayloadAction<string>) => {
      state.carts = state.carts.map(cartItem =>
        cartItem.productid === action.payload
          ? { ...cartItem, count: (cartItem.count || 1) + 1 }
          : cartItem
      );
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.carts));
      console.log("🚀 ~ JSON.stringify(state.carts):", JSON.stringify(state.carts))
    },
    decrementCount: (state, action: PayloadAction<string>) => {
      state.carts = state.carts.map(cartItem =>
        cartItem.productid === action.payload
          ? { ...cartItem, count: Math.max((cartItem.count || 1) - 1, 1) } // Prevent going below 1
          : cartItem
      );
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.carts));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.carts = state.carts.filter(cartItem => cartItem.productid !== action.payload);
      // Update localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.carts));
    },

    // Add the getRecentCart reducer
    getRecentCart: (state, action: PayloadAction<number>) => {
      // Return the last 'N' items in the cart (based on the payload)
      const recentItems = state.carts.slice(-action.payload);
      return { ...state, carts: recentItems }; // Return the recent carts
    }
  },
});

// Export actions
export const { addToCart, incrementCount, decrementCount, removeFromCart, getRecentCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
