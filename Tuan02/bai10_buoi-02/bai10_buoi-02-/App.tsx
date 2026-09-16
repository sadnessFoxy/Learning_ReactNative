import {View,Text,ActivityIndicator,FlatList} from 'react-native';
import {useState,useEffect} from "react"
type Geo = {
  lat : number
  lon : number
}
type Address = {
  street : string
  suite : string
  city : string
  zipcode : string
  geo : Geo

}
type Company = {
 name : string
 catchPhrase : string
 bs : string
}
type User = {
  id : number,
  name : string,
  username : string,
  email : string,
  address ?: Address
  phone : string
  website : string
  company  ?: Company

}

const UserProfileDetail = ()=>{
   const [data,setData] = useState<User|null>(null)
   const [loading,setLoading] = useState<boolean>(true)
   useEffect(()=>{  
     const fetchData = async()=>{
        try{
          const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
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
            <Text>{data?.id}</Text>
            <Text>{data?.name}</Text>
            <Text>{data?.username}</Text>
            <Text>{data?.email}</Text>
            <Text>{data?.address?.street}</Text>
            <Text>{data?.address?.suite}</Text>
            <Text>{data?.address?.city}</Text>
            <Text>{data?.address?.zipcode}</Text>
            <Text>{data?.address?.geo?.lat}</Text>
            <Text>{data?.address?.geo?.lon}</Text>
            <Text>{data?.phone}</Text>
            <Text>{data?.website}</Text>
            <Text>{data?.company?.name}</Text>
            <Text>{data?.company?.catchPhrase}</Text>
            <Text>{data?.company?.bs}</Text>

         </View>
}



const Test = ()=>{
  return <>
    <View> 
         <UserProfileDetail/>
    </View>
  </>
} 

export default Test;