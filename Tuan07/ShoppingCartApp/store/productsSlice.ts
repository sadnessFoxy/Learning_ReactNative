import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from './types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=8');
      if (!response.ok) return rejectWithValue(`Máy chủ trả về lỗi ${response.status}.`);

      const data: unknown = await response.json();
      if (!Array.isArray(data)) return rejectWithValue('Dữ liệu sản phẩm từ API không hợp lệ.');

      return data.map((value, index) => {
        if (
          !isRecord(value) ||
          typeof value.id !== 'number' ||
          typeof value.title !== 'string' ||
          typeof value.category !== 'string' ||
          typeof value.price !== 'number'
        ) {
          throw new Error(`Sản phẩm thứ ${index + 1} có dữ liệu không hợp lệ.`);
        }

        return {
          id: value.id + 1000,
          name: value.title,
          category: value.category,
          price: value.price * 25000,
          image: typeof value.image === 'string' ? value.image : undefined,
        };
      });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Không thể tải sản phẩm.');
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Không thể tải sản phẩm.';
      });
  },
});

export default productsSlice.reducer;
