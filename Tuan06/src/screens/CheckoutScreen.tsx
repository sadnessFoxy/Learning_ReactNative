import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function CheckoutScreen({ route, navigation }: any) {
  const { totalPrice = 0 } = route?.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#0A2458" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <FontAwesome name="credit-card" size={64} color="#0A2458" />
        <Text style={styles.title}>Xác nhận đơn hàng</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.label}>Tổng số tiền cần thanh toán:</Text>
          <Text style={styles.price}>{Number(totalPrice).toLocaleString()} đ</Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => Alert.alert('Thông báo', 'Đặt hàng thành công!')}
        >
          <Text style={styles.confirmText}>Xác nhận thanh toán</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 24,
  },
  summaryBox: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  confirmButton: {
    width: '100%',
    backgroundColor: '#0A2458',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
