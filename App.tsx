import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import DateInputMask from './components/DateInputMask'
import NumberInput from './components/NumberInput'
import Output from './components/Output'
import OkresPobytu from './components/OkresPobytu'
import { useState } from 'react'

export default function App() {
  const [startDate, setStartDate] = useState('')
  const [okresZakazu, setOkresZakazu] = useState(0)
  const [dniPobytu, setDniPobytu] = useState(0) //okres pobytu w dniach

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          justifyContent: 'space-between',
          height: 170,
          backgroundColor: 'transparent',
        }}
      >
        <DateInputMask setDateState={setStartDate} label="rozpoczęcie zakazu" />
        <NumberInput setOkresZakazu={setOkresZakazu} />
      </View>
      <OkresPobytu setDniPobytu={setDniPobytu}></OkresPobytu>
      <Output
        okresZakazu={okresZakazu}
        startDate={startDate}
        dniPobytu={dniPobytu}
      />
      {/* <StatusBar style="auto" /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 70,
    gap: 20
  },
})
