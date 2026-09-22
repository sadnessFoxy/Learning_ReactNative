import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

function FloatingCartButton() {
    let navigation: any;
    try {
        navigation = useNavigation();
    } catch {
        navigation = null;
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.85}
            onPress={() => navigation?.navigate("Cart")}
        >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Giỏ hàng</Text>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>5</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "#76ABF1",
        bottom: 75,
        right: 12,
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    badge: {
        position: "absolute",
        right: -2,
        top: -4,
        backgroundColor: "red",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 10,
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    }
})

export default FloatingCartButton