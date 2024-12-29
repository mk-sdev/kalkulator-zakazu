import { useState, useEffect } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import DateInputMask from './components/DateInput'
import NumberInput from './components/NumberInput'
import OkresPobytu from './components/OkresPobytu'
import Output from './components/Output'
import { backgroundColor } from './utils/styles'
import * as Updates from 'expo-updates'

export default function App() {
  const [startDate, setStartDate] = useState('')
  const [okresZakazu, setOkresZakazu] = useState(0)
  const [dniPobytu, setDniPobytu] = useState(0) //okres pobytu w dniach

  // Dodajemy efekt do sprawdzania dostępnych aktualizacji
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync()
        if (update.isAvailable) {
          // Jeśli dostępna jest aktualizacja, zapytaj, czy chce ją pobrać
          // const shouldUpdate = window.confirm(
          //   'Dostępna jest nowa wersja aplikacji. Czy chcesz ją zainstalować?'
          // )
          // if (shouldUpdate) {
          await Updates.fetchUpdateAsync()
          await Updates.reloadAsync() // Zrestartowanie aplikacji po aktualizacji
          // }
        }
      } catch (error) {
        console.error('Błąd podczas sprawdzania aktualizacji:', error)
      }
    }

    checkForUpdates()
  }, [])

  return (
    <View style={{ height: '100%', backgroundColor: backgroundColor }}>
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
          <DateInputMask
            setDateState={setStartDate}
            label="rozpoczęcie zakazu"
          />
          <NumberInput setOkresZakazu={setOkresZakazu} />
        </View>

        <OkresPobytu setDniPobytu={setDniPobytu}></OkresPobytu>
        <Output
          okresZakazu={okresZakazu}
          startDate={startDate}
          dniPobytu={dniPobytu}
        />
        <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 70,
    gap: 20,
  },
})
