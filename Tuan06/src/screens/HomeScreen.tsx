import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Header from '../components/Header';
import CategoryChip from '../components/CategoryChip';
import BookCard from '../components/BookCard';
import FloatingCartButton from '../components/FloatingCartButton';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <CategoryChip />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BookCard />
      </ScrollView>
      <FloatingCartButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
