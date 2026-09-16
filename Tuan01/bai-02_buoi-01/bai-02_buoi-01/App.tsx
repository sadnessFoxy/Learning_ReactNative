import { StyleSheet, Text, View, Pressable } from 'react-native';
import {useState} from "react"

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const hanldeIncrement = () => {
  setCount(count + 1);
};
  const handleDecrement = () => {
  setCount(count - 1);
};
  return (
    <>
      <Pressable onPress={hanldeIncrement}> <Text> increase </Text> </Pressable>
      <Pressable onPress={handleDecrement}> <Text> decrease </Text> </Pressable>
      <Text> {count} </Text>
    </>
  );
};

export default function Test() {
  return (
    <View>
      <Counter> </Counter>
    </View>
  )
}
