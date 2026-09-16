
import {RefreshControl, ScrollView, StyleSheet, Text,View} from 'react-native';
import {useState} from "react"
 
interface todoType{
  id : string,
  title : string
}
const TodoList = ()=>{
  const [todo,setTodo] =useState<todoType[]>([
    {id: "001", title:"Yeu em"},
    {id: "002", title:"Thuong em"},
    {id: "003", title:"Men em"}
  ])
  return (
    <View>
    {
      todo.map((x)=>(
       <Text >{x.id}, {x.title} </Text>
     ))
    }
    </View>
      
  )

}
const App = () => {
  return(
    <View>

    <TodoList></TodoList>

    </View>
  )
}
 
export default App;