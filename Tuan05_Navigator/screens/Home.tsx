import React from 'react'
import { StyleSheet, View,Text, Pressable} from 'react-native'


function Home() {
  return (
    <View style={styles.container}>
        <View style={styles.imgFrame}>THIS IS IPHONE 1120 </View>
        <View style={styles.infoFrame}>
            <Text style={{fontSize:18}}>Iphone 1120 like new 99%</Text>
            <Text style={{fontSize:18}}> ⭐ ⭐ ⭐ ⭐ ⭐ (view 1220 reviews)</Text>
            <Text>
            <Text style={{fontSize:20, fontWeight:"bold"}}>120.000 $    </Text>
            <Text style={{textDecorationLine:"line-through"}}>220.000 $</Text>
            </Text>
            <Text style={{fontSize:20,color:'red',fontWeight:"bold",textTransform:"uppercase"}}>Get refund if there's somewhere selling this cheaper !</Text>

        </View>
        <Pressable style={styles.buttonColor}>
            <Text  style={{fontWeight:"bold"}}> 4 COLORS 2 CHOOSE </Text>
        </Pressable>
        <Pressable style={styles.buttonBuy}>
            <Text style={{color:"white",fontSize:25,fontWeight:"bold",}}> BUY </Text>
        </Pressable>

    </View>
    
  )
}
const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        flexDirection:"column",
        width:"100%",
        padding:10
    },
    imgFrame:{
        backgroundColor:"pink",
        height:350,
        width:"100%",
        color:"white",
        alignSelf:"flex-start",
        justifyContent:"center",
        alignItems:"center",
        fontSize:25,
        fontWeight:"bold",
        marginBottom:10
    },
    infoFrame:{
        height:150,
        width:"100%",
        paddingBottom:10,
    },
    buttonColor:{
        padding:10,
        width:"100%",
        alignItems:"center",
        borderRadius:10,
        borderWidth: 2,
        marginBottom:20
    },
    buttonBuy:{
        padding:10,
        width:"100%",
        alignItems:"center",
        borderRadius:10,
        borderWidth: 2,
        backgroundColor:"red",
    }

})

export default Home