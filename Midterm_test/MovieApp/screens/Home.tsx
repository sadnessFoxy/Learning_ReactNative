import React, { useEffect, useState } from 'react'
import { FlatList, View,Text,ActivityIndicator, Alert } from 'react-native'
import MovieCard from '../components/MovieCard'
import { Movie } from '../components/MovieCard'




function Home() {
    const [data,setData] = useState<Movie[]>([])
    const [loading,setLoading] = useState(true)

useEffect(()=>{
    const fetchData = async()=>{
        try{
            const res = await fetch("https://699fb84a3188b0b1d5369e2a.mockapi.io/movies")
            const data = await res.json()
            setData(data)
            setLoading(false)
        }catch(error){
            console.error(error);
        }
    }
     fetchData()
},[])
  return (
    loading?(<ActivityIndicator/>):(<FlatList 
        data={data} 
        renderItem={({item})=>(<MovieCard data={item} onSelect={(id)=>{window.alert(id)}}/>)} 
        keyExtractor={(item)=>item.id.toString()}>
    </FlatList>)
  )
}

export default Home 