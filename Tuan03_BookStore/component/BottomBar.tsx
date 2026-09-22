import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const list = [
    { name: "Trang chủ", icon: "home" as const, screen: "Home" },
    { name: "Danh mục", icon: "th-large" as const, screen: "Home" },
    { name: "Giỏ hàng", icon: "shopping-cart" as const, screen: "Cart" },
    { name: "Tài khoản", icon: "user" as const, screen: "Home" },
]

interface BottomBarProps {
    activeTab?: string;
}

function BottomBar({ activeTab: initialActiveTab }: BottomBarProps) {
    let navigation: any;
    try {
        navigation = useNavigation();
    } catch {
        navigation = null;
    }

    const defaultIndex = initialActiveTab 
        ? list.findIndex(item => item.name === initialActiveTab) 
        : 0;
    const [activeTab, setActiveTab] = useState(defaultIndex >= 0 ? defaultIndex : 0);

    const handlePress = (index: number, screen: string) => {
        setActiveTab(index);
        if (screen && navigation?.navigate) {
            navigation.navigate(screen);
        }
    };

    return (
        <View style={styles.container}>
            {list.map((item, index) => {
                const isActive = activeTab === index
                const color = isActive ? "#0A2458" : "#888"
                return (
                    <TouchableOpacity
                        key={index}
                        style={styles.tabItem}
                        onPress={() => handlePress(index, item.screen)}
                    >
                        <FontAwesome name={item.icon} size={22} color={color} />
                        <Text style={[styles.tabText, { color }]}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        backgroundColor: "#fff",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
    tabItem: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontSize: 12,
        marginTop: 4,
    }
})

export default BottomBar