import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BOOKS_DATA } from '../data/books';

export interface CartItem {
  bookId: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [
    { bookId: 1, quantity: 1 },
    { bookId: 2, quantity: 2 },
    { bookId: 3, quantity: 1 },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ bookId: number; quantity?: number }>) => {
      const { bookId, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.bookId === bookId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ bookId, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.bookId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ bookId: number; quantity: number }>) => {
      const { bookId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.bookId !== bookId);
      } else {
        const item = state.items.find((item) => item.bookId === bookId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectTotalQuantity = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => {
    const book = BOOKS_DATA.find((b) => b.id === item.bookId);
    return sum + (book ? book.priceNumber * item.quantity : 0);
  }, 0);

export default cartSlice.reducer;
