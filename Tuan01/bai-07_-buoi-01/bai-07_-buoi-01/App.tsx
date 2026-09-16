import {View,Text,TouchableOpacity} from 'react-native';
import {useState} from "react"

type Gender ="male" | "female"| " gay"
const GenderSelector = ()=>{
 const [gender,setGender] = useState<string>("male")
 const options: { label: string; value: Gender }[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Gay', value: 'gay' },
  ];
  return (
  <View>
    <Text>Choose one:</Text>

    <View>
      {options.map((item) => (
        <TouchableOpacity
          key={item.value}
          onPress={() => setGender(item.value)}
        >
          <Text>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <Text>
      Gender is: {gender}
    </Text>
  </View>
);
}

const Test = ()=>{
  return <>
    <View> 
      <GenderSelector/>
    </View>
  </>
} 

export default Test;