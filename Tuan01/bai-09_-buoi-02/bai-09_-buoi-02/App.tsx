import {View,Text,ActivityIndicator,FlatList} from 'react-native';
import {useState,useEffect} from "react"
type Post = {
  userId : number,
  id : number,
  title : string,
  completed : boolean
}
const NewFeed = ()=>{
   const [data,setData] = useState<Post[]>([])
   const [loading,setLoading] = useState<boolean>(true)
   useEffect(()=>{
     const fetchData = async()=>{
        try{
          const res = await fetch("https://jsonplaceholder.typicode.com/todos")
          const data = await res.json()
          setData(data)
        }catch(error){
          console.log(error)
        }finally{
          setLoading(false)
        }
     }
     fetchData()
},[])
  if(loading){
    return <View>
              <ActivityIndicator color="blue"/>
           </View>
  }
  return <View> 
            <FlatList data={data} renderItem ={({item}:{item:Post})=>
               <View>
                <Text>{item.id}</Text>
                <Text>{item.title}</Text>
                <Text>{item.completed?"Completed":"Incompleted"}</Text>
               </View>
               } keyExtractor={item => item.id.toString()}/>
         </View>
 //ngoai ra con co the ghi Flatlist<Post> thay vi hardcore item:{item:Post}
}



const Test = ()=>{
  return <>
    <View> 
      <NewFeed/>
    </View>
  </>
} 

export default Test;