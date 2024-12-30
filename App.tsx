import { useState, useEffect } from 'react'
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import DateInputMask from './components/DateInput'
import NumberInput from './components/NumberInput'
import Period from './components/Period'
import Output from './components/Output'
import { backgroundColor } from './utils/styles'
import * as Updates from 'expo-updates'

export default function App() {
  const [banStartDate, setBanStartDate] = useState('') // data rozpoczęcia zakazu
  const [banPeriod, setBanPeriod] = useState(0) // okrez zakazu w latach
  const [daysInPrison, setDaysInPrison] = useState(0) // łączna liczba dni wszystkich okresów pobytu

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync()
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync()
          await Updates.reloadAsync() // Restart the app after updation
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
            setDateState={setBanStartDate}
            label="rozpoczęcie zakazu"
          />
          <NumberInput setBanPeriod={setBanPeriod} />
        </View>

        <Period
          setDaysInPrison={setDaysInPrison}
          banStartDate={banStartDate}
        ></Period>
        <Output
          banStartDate={banStartDate}
          banPeriod={banPeriod}
          daysInPrison={daysInPrison}
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
