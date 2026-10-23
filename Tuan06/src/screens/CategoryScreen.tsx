import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { BOOKS_DATA } from '../data/books';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = [
  'Tất cả',
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Truyện tranh',
  'Ngoại ngữ',
  'Lịch sử',
];

export default function CategoryScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh mục sách</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
        {CATEGORIES.map((cat, idx) => (
          <TouchableOpacity key={idx} style={[styles.catChip, idx === 0 && styles.activeChip]}>
            <Text style={[styles.catText, idx === 0 && styles.activeCatText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.bookList}>
        {BOOKS_DATA.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={styles.bookRow}
            onPress={() => navigation.navigate('HomeTab', {
              screen: 'BookDetail',
              params: { bookId: book.id },
            })}
          >
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.author}>{book.author}</Text>
              <Text style={styles.price}>{book.price} đ</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2458',
  },
  categoryBar: {
    maxHeight: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeChip: {
    backgroundColor: '#0A2458',
  },
  catText: {
    fontSize: 13,
    color: '#555',
  },
  activeCatText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  author: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 4,
  },
  arrow: {
    fontSize: 22,
    color: '#aaa',
    marginLeft: 8,
  },
});
