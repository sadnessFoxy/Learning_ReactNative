import {View,Text,ActivityIndicator} from 'react-native';

type loadingType = {
  isLoading : boolean,
  children ?: React.ReactNode
}

const LoadingContainer = ({isLoading,children}:loadingType) => {
  if (isLoading){
    return <View> <ActivityIndicator color="blue"/> </View>
  }
 return (
   <View>
      {children}
   </View>
 )
};
const Test = ()=>{
  return <>
    <View> 
     <LoadingContainer isLoading={true} children={<Text>Hello World</Text>} />
    </View>
  </>
} 

export default Test;