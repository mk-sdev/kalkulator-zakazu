import React, { useEffect, useState } from 'react'
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { backgroundColor, primary, textColor } from '../utils/styles'
import DateInputMask from './DateInput'
import { isValidDate } from '../utils/validateDate'
import Card from './Card'
import { okresType } from '../utils/types'

export default function OkresPobytu({
  setDniPobytu,
}: {
  setDniPobytu: (e: number | Function) => void
}) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [okresyPobytu, setOkresyPobytu] = useState<okresType[]>([])
  const [resetInputsTrigger, setResetInputsTrigger] = useState(false)

  function countDays(): void {
    Keyboard.dismiss()
    if (!startDate || !endDate) {
      Alert.alert('Błąd', 'Proszę uzupełnić obie daty.')
      return
    }

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      Alert.alert('Błąd', 'Proszę podać poprawne daty.')
      return
    }

    try {
      const [startDay, startMonth, startYear] = startDate.split('/').map(Number)
      const [endDay, endMonth, endYear] = endDate.split('/').map(Number)

      const start = new Date(startYear, startMonth - 1, startDay)
      const end = new Date(endYear, endMonth - 1, endDay)

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        Alert.alert('Błąd', 'Proszę podać poprawne daty.')
        return
      }

      if (start > end) {
        Alert.alert(
          'Błąd',
          'Data końcowa nie może być wcześniejsza niż początkowa.'
        )
        return
      }

      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      setDniPobytu((prev: number) => prev + diffDays)
      setOkresyPobytu([
        ...okresyPobytu,
        { start: startDate, end: endDate, duration: diffDays },
      ])

      setResetInputsTrigger(prev => !prev)
    } catch (error) {
      alert('Wystąpił błąd podczas obliczania różnicy dat.')
      console.error(error)
    }
  }

  function usunOkresPobytu(index: number, duration: number): void {
    setOkresyPobytu(prev => prev.filter((_, i) => i !== index))
    setDniPobytu((prev: number) => prev - duration)
  }

  useEffect(() => {
    let lacznyOkres: number = 0
    okresyPobytu.forEach(okres => (lacznyOkres += okres.duration))
    setDniPobytu(lacznyOkres)
  }, [okresyPobytu])

  function setButtonColor(
    pressed: boolean
  ): '#0056b3' | '#3c6188' | typeof primary {
    if (pressed) return '#0056b3'
    if (!isValidDate(startDate) || !isValidDate(endDate)) return '#3c6188'
    return primary
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Wprowadź okresy pobytów</Text>
        <View style={styles.dateInputRow}>
          <DateInputMask
            setDateState={setStartDate}
            label="początek"
            resetTrigger={resetInputsTrigger}
          />
          <DateInputMask
            setDateState={setEndDate}
            label="koniec"
            resetTrigger={resetInputsTrigger}
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: setButtonColor(pressed) },
            // pressed ? styles.buttonPressed : null,
          ]}
          onPress={() => countDays()}
        >
          <Text style={styles.buttonText}>Zatwierdź</Text>
        </Pressable>
      </View>

      {okresyPobytu.length > 0 && (
        <React.Fragment>
          <View style={styles.divider}></View>
          <Text style={[styles.headerText, { marginTop: 20 }]}>
            Okresy pobytów
          </Text>
        </React.Fragment>
      )}

      <Card okresyPobytu={okresyPobytu} usunOkresPobytu={usunOkresPobytu} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0ebf8',
    padding: 20,
    flex: 1,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  inputContainer: {
    gap: 20,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.4,
    color: textColor,
  },
  dateInputRow: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: primary,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    elevation: 1,
  },
  buttonText: {
    color: backgroundColor,
    fontSize: 15,
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: textColor,
    marginTop: 20,
    opacity: 0.1,
  },
})
