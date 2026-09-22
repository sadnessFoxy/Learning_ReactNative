import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageSourcePropType, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BookInterface } from '../interface/BookInterface'

const books: BookInterface[] = [
    { id: 1, title: "Cho tôi xin một vé đi tuổi thơ", price: "120.000", discount: 20, image: require("../assets/cho-toi-xin-mot-ve-di-tuoi-tho.gif"), author: "Nguyễn Nhật Ánh" },
    { id: 2, title: "Hạ Đỏ", price: "130.000", discount: 10, image: require("../assets/ha_do.jpg"), author: "Nguyễn Nhật Ánh" },
    { id: 3, title: "Mắt Biếc", price: "140.000", discount: 15, image: require("../assets/mat_biec.jpg"), author: "Nguyễn Nhật Ánh" },
    { id: 4, title: "Ngày xưa có một chuyện tình", price: "150.000", discount: 30, image: require("../assets/ngay_xua_co_mot_chuyen_tinh.jpg"), author: "Nguyễn Nhật Ánh" },
    { id: 5, title: "Tôi thấy hoa vàng trên cỏ xanh", price: "160.000", discount: 25, image: require("../assets/toi_thay_hoa_vang_tren_co_xanh.jpg"), author: "Nguyễn Nhật Ánh" },
]

interface BookCardProps {
    isSingle?: boolean;
}

function BookCard({ isSingle = false }: BookCardProps) {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    let navigation: any;
    try {
        navigation = useNavigation();
    } catch {
        navigation = null;
    }

    return (
        <View style={styles.gridContainer}>
            {books.map((book) => (
                <TouchableOpacity 
                    key={book.id} 
                    activeOpacity={0.85}
                    onPress={() => navigation?.navigate('BookDetail', { book })}
                    style={[
                        styles.bookCard,
                        isSingle && styles.singleBookCard,
                        hoveredId === book.id && styles.bookCardHovered
                    ]}
                    {...({
                        onPointerEnter: () => setHoveredId(book.id),
                        onPointerLeave: () => setHoveredId(null)
                    } as any)}
                >
                    <View style={[styles.bookImg, isSingle && styles.singleBookImg]}>
                        <View style={styles.badge}>{book.discount}%</View>
                        <Image source={book.image} style={{ width: "100%", height: "100%" }} resizeMode='contain' />
                    </View>

                    <View style={isSingle && styles.singleBookInfo}>
                        {isSingle ? (
                            <>
                                <Text style={styles.singleTitle}>{book.title}</Text>
                                <Text style={styles.singleAuthor}>{book.author}</Text>
                                <Text style={styles.singlePrice}>{book.price}đ</Text>
                            </>
                        ) : (
                            <Text style={styles.bookInfo}>{book.title} _ {book.price}đ</Text>
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 12
    },
    bookCard: {
        width: "49%",
        paddingHorizontal: 7,
        alignContent: "space-around"
    },
    bookImg: {
        justifyContent: "center",
        alignItems: 'center',
        borderColor: "#FFD700",
        borderWidth: 2,
        aspectRatio: 3.18 / 4.8,
        width: "100%",
        marginBottom: 12
    },
    placeholderImg: {
        fontSize: 15,
        color: "white",
        textAlign: "center"
    },
    bookInfo: {
        marginBottom: 10,
        padding: 5,
        fontWeight: "bold"
    },
    badge: {
        backgroundColor: "red",
        width: "20%",
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        top: 0,
        left: 0,
        fontSize: 12,
        borderRadius: "15%",
        zIndex: 1,
        padding: 5
    },

    singleBookCard: {
        width: "100%",
        flexDirection: "row",
        marginBottom: 14,
    },
    singleBookImg: {
        width: "35%",
    },
    singleBookInfo: {
        flex: 1,
        paddingLeft: 14,
        justifyContent: "center",
    },
    singleTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    singleAuthor: {
        fontSize: 15,
        color: "#555",
        marginBottom: 8,
    },
    singlePrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
    },
    bookCardHovered: {
        transform: [{ scale: 1.03 }],
        cursor: "pointer",
    }
})

export default BookCard
