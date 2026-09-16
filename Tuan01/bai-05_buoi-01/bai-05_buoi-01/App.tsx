import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';

const Test = () => {
  const [text, setText] = useState<string>('');

  return (
    <View>
      <TextInput
        
        onChangeText={(value: string) => setText(value)}/>
      <Text>Số ký tự: {text.length}</Text>
    </View>
  );
};

export default Test;