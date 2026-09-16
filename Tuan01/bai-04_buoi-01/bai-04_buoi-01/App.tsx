
import {RefreshControl, ScrollView, StyleSheet, Text,View,Pressable} from 'react-native';
import {useState} from "react"
 
interface buttonType{
  lable : string,
  onPress? : ()=>void,
  color : string
}
const CustomButton = ({lable,onPress,color}:buttonType)=>{
  
  return (
    <Pressable onPress ={onPress} style={{backgroundColor:color}}>
     <Text>{lable}</Text>
    </Pressable>
      
  )

}
const App = () => {
  return(
    <View>

    <CustomButton lable="Click me" color="green"></CustomButton>

    </View>
  )
}
 
export default App;