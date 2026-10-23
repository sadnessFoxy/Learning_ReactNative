import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../hooks/useCart';

export default function FloatingCartButton() {
  const navigation = useNavigation<any>();
  const { totalQuantity } = useCart();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('CartTab')}
    >
      <Text style={styles.buttonText}>Giỏ hàng</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{totalQuantity}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#76ABF1',
    bottom: 75,
    right: 12,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: -4,
    backgroundColor: 'red',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
