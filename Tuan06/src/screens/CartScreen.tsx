import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCart } from '../hooks/useCart';

export default function CartScreen({ navigation }: any) {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  const handleCheckout = () => {
    navigation.navigate('Checkout', { totalPrice });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#0A2458" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng ({items.length})</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome name="shopping-cart" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.bookId} style={styles.cartRow}>
              <View style={styles.imageBox}>
                {item.book?.image && (
                  <Image source={item.book.image} style={styles.bookImage} resizeMode="contain" />
                )}
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {item.book?.title}
                </Text>
                <Text style={styles.bookPrice}>{item.book?.price} đ</Text>
              </View>

              <View style={styles.quantityBox}>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.bookId, item.quantity - 1)}
                    style={styles.qtyButton}
                  >
                    <Text style={styles.qtyButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.bookId, item.quantity + 1)}
                    style={styles.qtyButton}
                  >
                    <Text style={styles.qtyButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.subtotalPrice}>
                  {item.subtotal.toLocaleString()} đ
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => removeFromCart(item.bookId)}
                style={styles.deleteButton}
              >
                <FontAwesome name="trash" size={16} color="#999" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
          <Text style={styles.totalPriceText}>{totalPrice.toLocaleString()} đ</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkoutButton, items.length === 0 && styles.disabledButton]}
          activeOpacity={0.85}
          disabled={items.length === 0}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 52,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2458',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    gap: 12,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  imageBox: {
    width: 60,
    height: 80,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  infoBox: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  bookPrice: {
    fontSize: 13,
    color: '#666',
  },
  quantityBox: {
    width: 105,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  qtyButton: {
    width: 28,
    height: 28,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    width: 32,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  subtotalPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'red',
  },
  deleteButton: {
    padding: 6,
    marginLeft: 6,
  },
  checkoutBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalInfo: {
    flexDirection: 'column',
  },
  totalLabel: {
    fontSize: 12,
    color: '#777',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  checkoutButton: {
    backgroundColor: '#0A2458',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#bbb',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
