import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { selectAuth, login, logout } from '../store/authSlice';
import { selectWishlistIds, toggleWishlist } from '../store/wishlistSlice';
import { BOOKS_DATA } from '../data/books';

export default function AccountScreen() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(selectAuth);
  const wishlistIds = useSelector(selectWishlistIds);
  const wishlistBooks = BOOKS_DATA.filter((b) => wishlistIds.includes(b.id));

  const handleLoginMock = () => {
    dispatch(
      login({
        user: {
          id: 'user_01',
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@gmail.com',
        },
        token: 'mock_jwt_token_123456',
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Tài khoản</Text>

      {isLoggedIn && user ? (
        <View style={styles.card}>
          <View style={styles.avatar}>
            <FontAwesome name="user" size={40} color="#0A2458" />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Thành viên VIP</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <FontAwesome name="user-circle-o" size={60} color="#bbb" />
          <Text style={styles.guestTitle}>Chưa đăng nhập</Text>
          <Text style={styles.guestSub}>Đăng nhập để xem thông tin cá nhân và tích lũy điểm thưởng</Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginMock}>
            <Text style={styles.loginText}>Đăng nhập (Dữ liệu mẫu)</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="heart" size={18} color="red" />
          <Text style={styles.sectionTitle}>Danh sách yêu thích ({wishlistBooks.length})</Text>
        </View>

        {wishlistBooks.length === 0 ? (
          <Text style={styles.emptyWishlist}>Chưa có sách nào trong danh sách yêu thích</Text>
        ) : (
          wishlistBooks.map((book) => (
            <View key={book.id} style={styles.wishlistRow}>
              <Image source={book.image} style={styles.wishlistImg} resizeMode="contain" />
              <View style={styles.wishlistInfo}>
                <Text style={styles.wishlistTitle} numberOfLines={1}>{book.title}</Text>
                <Text style={styles.wishlistPrice}>{book.price} đ</Text>
              </View>
              <TouchableOpacity
                onPress={() => dispatch(toggleWishlist(book.id))}
                style={styles.heartButton}
              >
                <FontAwesome name="heart" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A2458',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e6ecf8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0A2458',
  },
  loginButton: {
    backgroundColor: '#0A2458',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  guestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  guestSub: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyWishlist: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 12,
  },
  wishlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  wishlistImg: {
    width: 40,
    height: 55,
    borderRadius: 4,
  },
  wishlistInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  wishlistTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  wishlistPrice: {
    fontSize: 13,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 2,
  },
  heartButton: {
    padding: 8,
  },
});
