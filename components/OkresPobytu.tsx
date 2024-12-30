import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { backgroundColor, primary, textColor } from '../utils/styles'
import DateInputMask from './DateInput'
import { isValidDate } from '../utils/validateDate'
import Cards from './Cards'
import { okresType } from '../utils/types'
import { datesInOrder } from '../utils/datesInOrder'
import { validateOkresPobytu } from '../utils/validateOkresPobytu'

export default function OkresPobytu({
  setDniPobytu,
  startZakazu,
}: {
  setDniPobytu: (e: number | Function) => void
  startZakazu: string
}) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [okresyPobytu, setOkresyPobytu] = useState<okresType[]>([])
  const [resetInputsTrigger, setResetInputsTrigger] = useState(false)

  function countDays(): void | number {
    Keyboard.dismiss()

    const result = validateOkresPobytu(startDate, endDate, startZakazu)
    if (result !== 1) return

    try {
      const [startDay, startMonth, startYear] = startDate.split('/').map(Number)
      const [endDay, endMonth, endYear] = endDate.split('/').map(Number)

      const start = new Date(startYear, startMonth - 1, startDay)
      const end = new Date(endYear, endMonth - 1, endDay)

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
    if (
      !isValidDate(startDate) ||
      !isValidDate(endDate) ||
      datesInOrder(startDate, endDate) < 1 ||
      datesInOrder(startZakazu, startDate) === -1
    )
      return '#3c6188'
    return primary
  }

  function setButtonOpacity(): number {
    if (
      !isValidDate(startDate) ||
      !isValidDate(endDate) ||
      datesInOrder(startDate, endDate) < 1 ||
      datesInOrder(startZakazu, startDate) === -1
    )
      return 0.55
    return 1
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.headerText} accessibilityRole="header">
          Wprowadź okres pobytu
        </Text>
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
            { opacity: setButtonOpacity() },
          ]}
          onPress={() => countDays()}
          accessibilityLabel="Zatwierdź daty"
          accessibilityRole="button"
          accessible={true}
        >
          <Text style={styles.buttonText}>Zatwierdź</Text>
        </Pressable>
      </View>

      {okresyPobytu.length > 0 && (
        <React.Fragment>
          <View style={styles.divider}></View>
          <Text
            style={[styles.headerText, { marginTop: 20 }]}
            accessibilityRole="header"
          >
            Okresy pobytów:
          </Text>
        </React.Fragment>
      )}

      <Cards okresyPobytu={okresyPobytu} usunOkresPobytu={usunOkresPobytu} />
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
