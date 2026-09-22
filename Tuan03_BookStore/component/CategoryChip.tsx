import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

function CategoryChip() {
    const catChips = ["Văn học", "Kinh tế", "Thiếu nhi", "Truyện tranh", "Ngoại ngữ", "Lịch sử"]
    return (
        <View style={styles.gridContainer}>
            {
                catChips.map((chip, index) => (
                    <View key={index} style={styles.chip}>
                        <Text>{chip}</Text>
                    </View>
                ))
            }
        </View>
    )
}
const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        padding: 10,
    },
    chip: {
        borderWidth: 2,
        borderColor: "#0A2458",
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 5
    }

})
export default CategoryChip