import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Home from './screens/Home';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>
            Movie App
          </Text>
          <Home/>
          </View>       
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


