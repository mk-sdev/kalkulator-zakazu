import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import DateInputMask from './components/DateInputMask'
import NumberInput from './components/NumberInput'
import Output from './components/Output'
import OkresPobytu from './components/OkresPobytu'
import { useState } from 'react'

export default function App() {
  const [startDate, setStartDate] = useState('d')
  const [dniPobytu, setDniPobytu] = useState(0) //okres pobytu w dniach

  return (
    <View style={styles.container}>
      <DateInputMask setDateState={setStartDate}></DateInputMask>
      <NumberInput />
      <OkresPobytu setDniPobytu={setDniPobytu}></OkresPobytu>
      <Output />
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
