import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
} from '../store/cartSlice';
import { BOOKS_DATA, BookInterface } from '../data/books';

export interface EnrichedCartItem {
  bookId: number;
  quantity: number;
  book?: BookInterface;
  subtotal: number;
}

export function useCart() {
  const dispatch = useDispatch();
  const rawItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  const cartItems: EnrichedCartItem[] = rawItems.map((item) => {
    const book = BOOKS_DATA.find((b) => b.id === item.bookId);
    return {
      ...item,
      book,
      subtotal: (book?.priceNumber || 0) * item.quantity,
    };
  });

  return {
    items: cartItems,
    totalQuantity,
    totalPrice,
    addToCart: (bookId: number, quantity?: number) => dispatch(addToCart({ bookId, quantity })),
    removeFromCart: (bookId: number) => dispatch(removeFromCart(bookId)),
    updateQuantity: (bookId: number, quantity: number) => dispatch(updateQuantity({ bookId, quantity })),
    clearCart: () => dispatch(clearCart()),
  };
}
