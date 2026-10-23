import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BOOKS_DATA } from '../data/books';
import { useCart } from '../hooks/useCart';

export default function BookDetailScreen({ route, navigation }: any) {
  const { bookId } = route?.params || {};
  const book = BOOKS_DATA.find((b) => b.id === bookId) || BOOKS_DATA[0];
  const { addToCart } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#0A2458" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Chi tiết sách</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.imageContainer}>
        <Image source={book.image} style={styles.coverImage} resizeMode="contain" />
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Tác giả: {book.author}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{book.price} đ</Text>
          {book.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{book.discount}%</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.priceInfo}>
          <Text style={styles.bottomPriceLabel}>Đơn giá:</Text>
          <Text style={styles.bottomPrice}>{book.price} đ</Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          activeOpacity={0.85}
          onPress={() => addToCart(book.id, 1)}
        >
          <FontAwesome name="shopping-cart" size={18} color="#fff" />
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  imageContainer: {
    alignSelf: 'center',
    width: '50%',
    aspectRatio: 3.15 / 4.8,
    marginVertical: 12,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  author: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'red',
  },
  discountText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginBottom: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  priceInfo: {
    flexDirection: 'column',
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: '#888',
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  addToCartButton: {
    backgroundColor: '#0A2458',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
