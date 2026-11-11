import { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  persistCart,
  removeFromCart,
  restoreCart,
  toggleCoupon,
  addToCart,
} from './store/cartSlice';
import { fetchProducts } from './store/productsSlice';
import type { Product } from './store/types';

type Level = 1 | 2 | 3;

const LOCAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Tai nghe không dây', category: 'Phụ kiện', price: 590000 },
  { id: 2, name: 'Bàn phím cơ mini', category: 'Thiết bị', price: 1290000 },
  { id: 3, name: 'Chuột không dây', category: 'Phụ kiện', price: 450000 },
  { id: 4, name: 'Loa Bluetooth', category: 'Âm thanh', price: 890000 },
  { id: 5, name: 'Đèn bàn học', category: 'Gia dụng', price: 320000 },
];

const money = (amount: number) => `${Math.round(amount).toLocaleString('vi-VN')} ₫`;

function ShoppingCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.products);
  const [level, setLevel] = useState<Level>(1);

  useEffect(() => {
    void dispatch(restoreCart());
  }, [dispatch]);

  useEffect(() => {
    if (cart.storageStatus !== 'ready') return;
    const timer = setTimeout(() => {
      void dispatch(persistCart(cart.items));
    }, 250);
    return () => clearTimeout(timer);
  }, [cart.items, cart.storageStatus, dispatch]);

  useEffect(() => {
    if (level === 3 && products.status === 'idle') {
      void dispatch(fetchProducts());
    }
  }, [dispatch, level, products.status]);

  const shownProducts = level === 3 && products.items.length > 0
    ? products.items
    : LOCAL_PRODUCTS;
  const subtotal = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart.items],
  );
  const tax = level === 3 ? subtotal * 0.1 : 0;
  const shipping = level === 3 && subtotal > 0 && subtotal < 1000000 ? 30000 : 0;
  const discount = level === 3 && cart.couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + tax + shipping - discount;

  const addProduct = (product: Product) => {
    void dispatch(addToCart({ product, increaseExisting: level > 1 }));
  };

  const renderProduct = (product: Product) => {
    const inCart = cart.items.some((item) => item.id === product.id);
    return (
      <View key={product.id} style={styles.productCard}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
        ) : (
          <View style={styles.productImagePlaceholder}>
            <Text style={styles.placeholderText}>{product.name.slice(0, 1)}</Text>
          </View>
        )}
        <View style={styles.productInfo}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.price}>{money(product.price)}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={level === 1 && inCart}
          onPress={() => addProduct(product)}
          style={({ pressed }) => [
            styles.addButton,
            level === 1 && inCart && styles.disabledButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.addButtonText}>
            {level === 1 && inCart ? 'Đã thêm' : '+ Thêm'}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>REDUX TOOLKIT • THỰC HÀNH</Text>
            <Text style={styles.title}>Giỏ hàng</Text>
          </View>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {cart.items.reduce((count, item) => count + item.quantity, 0)}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Chọn cấp độ</Text>
        <View style={styles.levelRow}>
          {([
            { id: 1, title: 'Cơ bản', subtitle: 'Thêm / xóa' },
            { id: 2, title: 'Nâng cao', subtitle: 'Số lượng / tổng' },
            { id: 3, title: 'Chuyên nghiệp', subtitle: 'API / lưu trữ' },
          ] as const).map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setLevel(item.id)}
              style={[styles.levelCard, level === item.id && styles.levelCardActive]}
            >
              <Text style={[styles.levelNumber, level === item.id && styles.activeText]}>
                {item.id}
              </Text>
              <Text style={[styles.levelTitle, level === item.id && styles.activeText]}>
                {item.title}
              </Text>
              <Text style={[styles.levelSubtitle, level === item.id && styles.activeSubtext]}>
                {item.subtitle}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.lessonBanner}>
          <Text style={styles.lessonTitle}>
            Level {level}: {level === 1 ? 'Giỏ hàng cơ bản' : level === 2 ? 'Quản lý số lượng' : 'Tích hợp nâng cao'}
          </Text>
          <Text style={styles.lessonText}>
            {level === 1 && 'Thêm sản phẩm vào giỏ, xem danh sách và xóa sản phẩm.'}
            {level === 2 && 'Sản phẩm trùng sẽ tăng số lượng; có thể tăng, giảm và xem tổng tiền.'}
            {level === 3 && 'Tải sản phẩm từ API, lưu giỏ trên thiết bị và tính thuế, vận chuyển, giảm giá.'}
          </Text>
        </View>

        {level === 3 && products.status === 'loading' && (
          <View style={styles.notice}>
            <ActivityIndicator color={COLORS.primary} />
            <Text style={styles.noticeText}>Đang tải sản phẩm từ API...</Text>
          </View>
        )}
        {level === 3 && products.status === 'failed' && (
          <View style={[styles.notice, styles.errorNotice]}>
            <Text style={styles.errorText}>
              Không tải được sản phẩm: {products.error ?? 'Lỗi không xác định'}. Hiển thị sản phẩm mẫu.
            </Text>
            <Pressable onPress={() => void dispatch(fetchProducts())}>
              <Text style={styles.retryText}>Thử lại</Text>
            </Pressable>
          </View>
        )}
        {level === 3 && cart.storageStatus === 'loading' && (
          <Text style={styles.storageText}>Đang khôi phục giỏ hàng đã lưu...</Text>
        )}
        {level === 3 && cart.storageError && (
          <Text style={styles.errorText}>Lưu trữ: {cart.storageError}</Text>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>
          {level === 3 && products.items.length > 0 && (
            <Text style={styles.apiLabel}>DỮ LIỆU API</Text>
          )}
        </View>
        {shownProducts.map(renderProduct)}

        <View style={styles.cartHeader}>
          <View>
            <Text style={styles.sectionTitle}>Giỏ của bạn</Text>
            <Text style={styles.itemCount}>{cart.items.length} loại sản phẩm</Text>
          </View>
          {cart.items.length > 0 && (
            <Pressable onPress={() => void dispatch(removeFromCart(null))}>
              <Text style={styles.clearText}>Xóa tất cả</Text>
            </Pressable>
          )}
        </View>

        {cart.items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Giỏ hàng đang trống</Text>
            <Text style={styles.emptyText}>Chọn sản phẩm phía trên để bắt đầu.</Text>
          </View>
        ) : (
          <>
            {cart.items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>{money(item.price)}</Text>
                </View>
                {level > 1 && (
                  <View style={styles.quantityControl}>
                    <Pressable
                      accessibilityLabel={`Giảm số lượng ${item.name}`}
                      onPress={() => void dispatch(decreaseQuantity(item.id))}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </Pressable>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <Pressable
                      accessibilityLabel={`Tăng số lượng ${item.name}`}
                      onPress={() => void dispatch(increaseQuantity(item.id))}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                  </View>
                )}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Xóa ${item.name}`}
                  onPress={() => void dispatch(removeFromCart(item.id))}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>Xóa</Text>
                </Pressable>
              </View>
            ))}

            {level > 1 && (
              <View style={styles.summary}>
                <SummaryRow label="Tạm tính" value={money(subtotal)} />
                {level === 3 && (
                  <>
                    <SummaryRow label="Thuế (10%)" value={money(tax)} />
                    <SummaryRow label="Phí vận chuyển" value={shipping === 0 ? 'Miễn phí' : money(shipping)} />
                    <Pressable
                      onPress={() => void dispatch(toggleCoupon())}
                      style={[styles.couponButton, cart.couponApplied && styles.couponApplied]}
                    >
                      <Text style={styles.couponText}>
                        {cart.couponApplied ? '✓ Đã áp dụng SAVE10' : 'Áp mã giảm giá SAVE10'}
                      </Text>
                    </Pressable>
                    {discount > 0 && <SummaryRow label="Giảm giá" value={`− ${money(discount)}`} />}
                  </>
                )}
                <View style={styles.divider} />
                <SummaryRow label="Tổng cộng" value={money(total)} bold />
              </View>
            )}
          </>
        )}
        <Text style={styles.footer}>Bài thực hành Redux Toolkit • Tuan07</Text>
      </ScrollView>
    </View>
  );
}

function SummaryRow({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, bold && styles.summaryBold]}>{label}</Text>
      <Text style={[styles.summaryValue, bold && styles.summaryBold]}>{value}</Text>
    </View>
  );
}

const COLORS = {
  primary: '#5B5CE2',
  text: '#20213A',
  muted: '#77798F',
  border: '#E8E8F0',
  background: '#F6F6FB',
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20, paddingTop: 58, paddingBottom: 36 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  eyebrow: { color: COLORS.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: COLORS.text, fontSize: 32, fontWeight: '800', marginTop: 5 },
  cartBadge: { width: 46, height: 46, borderRadius: 16, backgroundColor: '#E8E8FF', alignItems: 'center', justifyContent: 'center' },
  cartBadgeText: { color: COLORS.primary, fontSize: 18, fontWeight: '800' },
  sectionTitle: { color: COLORS.text, fontSize: 19, fontWeight: '800' },
  levelRow: { flexDirection: 'row', gap: 9, marginTop: 12, marginBottom: 18 },
  levelCard: { flex: 1, minHeight: 103, padding: 10, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: COLORS.border },
  levelCardActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  levelNumber: { color: COLORS.primary, fontSize: 12, fontWeight: '800' },
  levelTitle: { color: COLORS.text, fontSize: 12, fontWeight: '800', marginTop: 7 },
  levelSubtitle: { color: COLORS.muted, fontSize: 10, marginTop: 4 },
  activeText: { color: '#FFFFFF' },
  activeSubtext: { color: '#E6E6FF' },
  lessonBanner: { backgroundColor: '#ECECFF', borderRadius: 16, padding: 15, marginBottom: 22 },
  lessonTitle: { color: COLORS.primary, fontSize: 15, fontWeight: '800' },
  lessonText: { color: '#53546E', fontSize: 13, lineHeight: 19, marginTop: 5 },
  notice: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 13, backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 16 },
  noticeText: { color: COLORS.muted, fontSize: 13 },
  errorNotice: { alignItems: 'flex-start', flexDirection: 'column', gap: 8, backgroundColor: '#FFF0EF' },
  errorText: { color: '#B33E36', fontSize: 12, lineHeight: 18, marginBottom: 8 },
  retryText: { color: COLORS.primary, fontWeight: '800' },
  storageText: { color: COLORS.muted, fontSize: 12, marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 },
  apiLabel: { color: '#22856A', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  productCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border },
  productImage: { width: 54, height: 54, marginRight: 12 },
  productImagePlaceholder: { width: 54, height: 54, borderRadius: 14, marginRight: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECECFF' },
  placeholderText: { color: COLORS.primary, fontSize: 22, fontWeight: '800' },
  productInfo: { flex: 1, paddingRight: 6 },
  category: { color: COLORS.muted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.6 },
  productName: { color: COLORS.text, fontSize: 13, fontWeight: '700', marginTop: 3 },
  price: { color: COLORS.primary, fontSize: 13, fontWeight: '800', marginTop: 5 },
  addButton: { backgroundColor: COLORS.primary, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 9 },
  disabledButton: { backgroundColor: '#A8A8BB' },
  addButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  pressed: { opacity: 0.75 },
  cartHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 12 },
  itemCount: { color: COLORS.muted, fontSize: 12, marginTop: 3 },
  clearText: { color: '#D45454', fontSize: 12, fontWeight: '700' },
  emptyCard: { alignItems: 'center', paddingVertical: 28, paddingHorizontal: 18, backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  emptyIcon: { fontSize: 28, marginBottom: 8 },
  emptyTitle: { color: COLORS.text, fontSize: 15, fontWeight: '800' },
  emptyText: { color: COLORS.muted, fontSize: 12, marginTop: 5 },
  cartItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 13, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, marginBottom: 8 },
  cartItemInfo: { flex: 1, paddingRight: 6 },
  cartItemPrice: { color: COLORS.muted, fontSize: 11, marginTop: 4 },
  quantityControl: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 5 },
  quantityButton: { width: 27, height: 27, alignItems: 'center', justifyContent: 'center', borderRadius: 9, backgroundColor: '#F0F0FA' },
  quantityButtonText: { color: COLORS.primary, fontSize: 17, fontWeight: '700' },
  quantity: { minWidth: 14, textAlign: 'center', color: COLORS.text, fontSize: 13, fontWeight: '700' },
  removeButton: { paddingVertical: 7, paddingHorizontal: 8 },
  removeText: { color: '#D45454', fontSize: 11, fontWeight: '700' },
  summary: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, marginTop: 4, borderWidth: 1, borderColor: COLORS.border },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  summaryLabel: { color: COLORS.muted, fontSize: 13 },
  summaryValue: { color: COLORS.text, fontSize: 13, fontWeight: '600' },
  summaryBold: { color: COLORS.text, fontSize: 15, fontWeight: '800' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 9 },
  couponButton: { alignSelf: 'flex-start', backgroundColor: '#F0F0FF', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 9, marginVertical: 8 },
  couponApplied: { backgroundColor: '#E5F6EF' },
  couponText: { color: COLORS.primary, fontSize: 11, fontWeight: '800' },
  footer: { color: '#A1A2B0', textAlign: 'center', fontSize: 10, marginTop: 25 },
});

export default function App() {
  return (
    <Provider store={store}>
      <ShoppingCart />
    </Provider>
  );
}
