import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from './types';

const CART_STORAGE_KEY = 'shopping-cart-items';

interface CartState {
  items: CartItem[];
  couponApplied: boolean;
  storageStatus: 'idle' | 'loading' | 'ready';
  storageError: string | null;
}

const initialState: CartState = {
  items: [],
  couponApplied: false,
  storageStatus: 'idle',
  storageError: null,
};

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'number' &&
    typeof item.name === 'string' &&
    typeof item.category === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  );
}

export const restoreCart = createAsyncThunk<CartItem[], void, { rejectValue: string }>(
  'cart/restore',
  async (_, { rejectWithValue }) => {
    try {
      const saved = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (saved === null) return [];
      const parsed: unknown = JSON.parse(saved);
      if (!Array.isArray(parsed) || !parsed.every(isCartItem)) {
        return rejectWithValue('Dữ liệu giỏ hàng đã lưu không hợp lệ.');
      }
      return parsed;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Không thể đọc giỏ hàng đã lưu.');
    }
  },
);

export const persistCart = createAsyncThunk<void, CartItem[], { rejectValue: string }>(
  'cart/persist',
  async (items, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Không thể lưu giỏ hàng.');
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; increaseExisting: boolean }>,
    ) => {
      const { product, increaseExisting } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        if (increaseExisting) existing.quantity += 1;
        return;
      }
      state.items.push({ ...product, quantity: 1 });
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (!item) return;
      if (item.quantity <= 1) {
        state.items = state.items.filter((entry) => entry.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number | null>) => {
      state.items = action.payload === null
        ? []
        : state.items.filter((item) => item.id !== action.payload);
    },
    toggleCoupon: (state) => {
      state.couponApplied = !state.couponApplied;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreCart.pending, (state) => {
        state.storageStatus = 'loading';
      })
      .addCase(restoreCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.storageStatus = 'ready';
        state.storageError = null;
      })
      .addCase(restoreCart.rejected, (state, action) => {
        state.storageStatus = 'ready';
        state.storageError = action.payload ?? action.error.message ?? 'Không thể đọc giỏ hàng.';
      })
      .addCase(persistCart.fulfilled, (state) => {
        state.storageError = null;
      })
      .addCase(persistCart.rejected, (state, action) => {
        state.storageError = action.payload ?? action.error.message ?? 'Không thể lưu giỏ hàng.';
      });
  },
});

export const {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  toggleCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;
