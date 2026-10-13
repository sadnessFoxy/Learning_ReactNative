import React from 'react'
import { FlatList, View, Text,Image, TouchableOpacity, StyleSheet} from 'react-native'
export type Movie = {
    id:number,
    title:number,
    genre:number,
    year:number,
    rating:number,
    poster:string,
    isShowing:boolean
}
export type MovieCardProps={
    data:Movie,
    layout?:"row"|"tile",
    onSelect:(id:string)=>void
}
function MovieCard({data,layout="tile",onSelect}:MovieCardProps) {
    console.log(data.poster);
    
    const isTile = layout === "tile"
    const ratingText = `⭐ ${Number(data.rating).toFixed(1)}`
  return (
    <TouchableOpacity onPress={()=>onSelect(String(data.id))} style={[styles.cardRow,isTile && styles.cardTile]}>
        <View style={{position:"relative"}}>
            <Image source={{uri:data.poster}} style={[styles.posterRow,isTile && styles.posterTile]}/>
                {isTile&&(
                    <View style={styles.badgeTile}>
                        <Text>{ratingText}</Text>
                    </View>
                )}
        </View>     
        <View>
                <Text numberOfLines={isTile ? 1 : undefined}>{data.title}</Text>
                {
                 !isTile && (
                    <>
                        <Text>{data.genre}</Text>
                        <Text>{data.year}</Text>
                        <Text>{ratingText}</Text>
                    </>
                 )
                }
                <Text>{data.isShowing? "✅": "❌"}</Text>
        </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    cardRow:{
        flexDirection:"row",
    },
    cardTile:{
        flexDirection:"column",
        width:"48%"
    },
    posterTile:{
        width:"100%",
        aspectRatio:2/3,
        backgroundColor:"pink"
    },
    posterRow:{
        width:70,
        height:100,
        backgroundColor:"pink"  
    },
    badgeTile:{
        position:"absolute",
        top:0,
        right:0

    }
})

export default React.memo(MovieCard)