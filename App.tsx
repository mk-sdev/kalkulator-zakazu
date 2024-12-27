import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import DateInputMask from './components/DateInputMask'
import NumberInput from './components/NumberInput'

export default function App() {
  return (
    <View style={styles.container}>
      <DateInputMask></DateInputMask>
      <NumberInput></NumberInput>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
