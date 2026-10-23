import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistState {
  bookIds: number[];
}

const initialState: WishlistState = {
  bookIds: [1, 3],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.bookIds.indexOf(id);
      if (index >= 0) {
        state.bookIds.splice(index, 1);
      } else {
        state.bookIds.push(id);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.bookIds = state.bookIds.filter((id) => id !== action.payload);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistIds = (state: { wishlist: WishlistState }) => state.wishlist.bookIds;

export default wishlistSlice.reducer;
