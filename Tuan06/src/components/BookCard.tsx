import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BOOKS_DATA } from '../data/books';

export default function BookCard() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.gridContainer}>
      {BOOKS_DATA.map((book) => (
        <TouchableOpacity
          key={book.id}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
          style={[
            styles.bookCard,
            hoveredId === book.id && styles.bookCardHovered,
          ]}
        >
          <View style={styles.bookImg}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{book.discount}%</Text>
            </View>
            <Image source={book.image} style={styles.image} resizeMode="contain" />
          </View>
          <Text style={styles.bookInfo} numberOfLines={2}>
            {book.title} _ {book.price}đ
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  bookCard: {
    width: '49%',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  bookImg: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFD700',
    borderWidth: 2,
    aspectRatio: 3.18 / 4.8,
    width: '100%',
    marginBottom: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bookInfo: {
    marginBottom: 8,
    paddingHorizontal: 4,
    fontWeight: 'bold',
    fontSize: 13,
  },
  badge: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderBottomRightRadius: 8,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
  bookCardHovered: {
    transform: [{ scale: 1.03 }],
  },
});
