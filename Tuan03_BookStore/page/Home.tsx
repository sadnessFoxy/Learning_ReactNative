import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Header from '../component/Header';
import BookCard from '../component/BookCard';
import CategoryChip from '../component/CategoryChip';
import FloatingCartButton from '../component/FloatingCartButton';
import BottomBar from '../component/BottomBar';

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <CategoryChip />
      <ScrollView>
        <BookCard />
      </ScrollView>
      <FloatingCartButton />
      <BottomBar activeTab="Trang chủ" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
