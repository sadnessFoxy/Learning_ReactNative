import React from 'react'
import { StyleSheet, View, Image, Pressable } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

interface HeaderProps {
  navigation?: any
}

function Header({ navigation }: HeaderProps) {
  return (
    <View style={styles.gridContainer}>
      <View>
        <Image source={require("../assets/logo_nha_sach.png")} style={styles.logo} />
      </View>
      <View style={styles.rightContainer}>
        <Pressable onPress={() => console.log("search")}>
          <FontAwesome name="search" size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => navigation?.navigate ? navigation.navigate("Cart") : console.log("Cart")}>
          <FontAwesome name="shopping-cart" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  gridContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#0A2458",
    borderBottomEndRadius: 10,
    borderTopLeftRadius: 10
  },
  logo: {
    height: 50,
    width: 100,
    borderRadius: "10%"
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  }
})

export default Header