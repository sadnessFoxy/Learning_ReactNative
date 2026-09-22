import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomBar from '../component/BottomBar';

interface CartItem {
    id: number;
    title: string;
    priceNumber: number;
    price: string;
    quantity: number;
    image: any;
}

const initialCartItems: CartItem[] = [
    {
        id: 1,
        title: "Cho tôi xin một vé đi tuổi thơ",
        priceNumber: 120000,
        price: "120.000",
        quantity: 1,
        image: require("../assets/cho-toi-xin-mot-ve-di-tuoi-tho.gif"),
    },
    {
        id: 2,
        title: "Hạ Đỏ",
        priceNumber: 130000,
        price: "130.000",
        quantity: 2,
        image: require("../assets/ha_do.jpg"),
    },
    {
        id: 3,
        title: "Mắt Biếc",
        priceNumber: 140000,
        price: "140.000",
        quantity: 1,
        image: require("../assets/mat_biec.jpg"),
    },
    {
        id: 4,
        title: "Ngày xưa có một chuyện tình",
        priceNumber: 150000,
        price: "150.000",
        quantity: 1,
        image: require("../assets/ngay_xua_co_mot_chuyen_tinh.jpg"),
    },
    {
        id: 5,
        title: "Tôi thấy hoa vàng trên cỏ xanh",
        priceNumber: 160000,
        price: "160.000",
        quantity: 1,
        image: require("../assets/toi_thay_hoa_vang_tren_co_xanh.jpg"),
    },
];

export default function Cart({ navigation }: any) {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((prev) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        const newQty = item.quantity + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter(Boolean) as CartItem[]
        );
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.priceNumber * item.quantity,
        0
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color="#0A2458" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Giỏ hàng ({cartItems.length})</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* VÙNG 1: Nội dung cuộn ở giữa (ScrollView flex: 1) */}
            <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
                {cartItems.map((item) => (
                    <View key={item.id} style={styles.cartRow}>
                        {/* Ảnh cố định */}
                        <View style={styles.imageBox}>
                            <Image source={item.image} style={styles.bookImage} resizeMode="contain" />
                        </View>

                        {/* Tên flex: 1 */}
                        <View style={styles.infoBox}>
                            <Text style={styles.bookTitle} numberOfLines={2}>
                                {item.title}
                            </Text>
                            <Text style={styles.bookPrice}>{item.price} đ</Text>
                        </View>

                        {/* Số lượng + Giá width cố định */}
                        <View style={styles.quantityBox}>
                            <View style={styles.quantityControl}>
                                <TouchableOpacity
                                    onPress={() => updateQuantity(item.id, -1)}
                                    style={styles.qtyButton}
                                >
                                    <Text style={styles.qtyButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => updateQuantity(item.id, 1)}
                                    style={styles.qtyButton}
                                >
                                    <Text style={styles.qtyButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.subtotalPrice}>
                                {(item.priceNumber * item.quantity).toLocaleString()} đ
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* VÙNG 2: Thanh tổng tiền + nút thanh toán cố định ngay trên Tab Bar */}
            <View style={styles.checkoutBar}>
                <View style={styles.totalInfo}>
                    <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                    <Text style={styles.totalPriceText}>{totalPrice.toLocaleString()} đ</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.85}>
                    <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>

            {/* VÙNG 3: Tab Bar cố định của Bài tập 1 */}
            <BottomBar activeTab="Giỏ hàng" />
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
    checkoutButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
