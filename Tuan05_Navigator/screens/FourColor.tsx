import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
const COLORS = ['lightblue', 'red', 'pink', 'blue']
function FourColor({ navigation, route }: any) {
  const [selectedColor, setSelectedColor] = useState(route.params?.currentColor ?? 'pink')
  return (
    <View style={styles.container}>
      <View style={{ width: 150, height: 100, backgroundColor: selectedColor }} />

      {COLORS.map((c) => (
        <TouchableOpacity key={c} onPress={() => setSelectedColor(c)}>
          <View style={{ width: 80, height: 80, backgroundColor: c, margin: 8 }} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={() => navigation.navigate('Home', { selectedColor: selectedColor })} style={{ backgroundColor: "navy", paddingHorizontal: 50, paddingVertical: 20, borderWidth: 1, borderColor: "black", borderRadius: 10, marginTop: 10 }}>
        <Text style={{ color: "white" }}>XONG</Text>
      </TouchableOpacity>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
})

export default FourColor