import React, { useEffect, useState } from 'react'
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import { backgroundColor, primary, textColor } from '../utils/styles'
import DateInputMask from './DateInput'
import { isValidDate } from '../utils/isValidDate'
import Cards from './Cards'
import { periodType } from '../utils/types'
import { compareDates } from '../utils/compareDates'
import { validatePeriod } from '../utils/validatePeriod'
import { countDays } from '../utils/countDays'

export default function Period({
  setDaysInPrison,
  banStartDate,
}: {
  setDaysInPrison: (e: number | Function) => void
  banStartDate: string
}) {
  const [periodStartDate, setPeriodStartDate] = useState('')
  const [periodEndDate, setPeriodEndDate] = useState('')
  const [periods, setPeriods] = useState<periodType[]>([])
  const [resetInputsTrigger, setResetInputsTrigger] = useState(false)

  useEffect(() => {
    let totalDaysInPrison: number = 0
    periods.forEach(per => (totalDaysInPrison += per.duration))
    setDaysInPrison(totalDaysInPrison)
  }, [periods])

  function addPeriod(): void | number {
    Keyboard.dismiss()

    const result = validatePeriod(periodStartDate, periodEndDate, banStartDate)
    if (result !== 1) return

    try {

      const diffDays = countDays(periodStartDate, periodEndDate)

      setDaysInPrison((prev: number) => prev + diffDays)
      setPeriods([
        ...periods,
        { start: periodStartDate, end: periodEndDate, duration: diffDays },
      ])

      setResetInputsTrigger(prev => !prev)
    } catch (error) {
      alert('Wystąpił błąd podczas obliczania różnicy dat.')
      console.error(error)
    }
  }

  function deletePeriod(index: number, duration: number): void {
    setPeriods(prev => prev.filter((_, i) => i !== index))
    setDaysInPrison((prev: number) => prev - duration)
  }

  function setButtonColor(
    pressed: boolean
  ): '#0056b3' | '#3c6188' | typeof primary {
    if (pressed) return '#0056b3'
    if (
      !isValidDate(periodStartDate) ||
      !isValidDate(periodEndDate) ||
      compareDates(periodStartDate, periodEndDate) < 1 ||
      compareDates(banStartDate, periodStartDate) === -1
    )
      return '#3c6188'
    return primary
  }

  function setButtonOpacity(): number {
    if (
      !isValidDate(periodStartDate) ||
      !isValidDate(periodEndDate) ||
      compareDates(periodStartDate, periodEndDate) < 1 ||
      compareDates(banStartDate, periodStartDate) === -1
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
            setDateState={setPeriodStartDate}
            label="początek"
            resetTrigger={resetInputsTrigger}
          />
          <DateInputMask
            setDateState={setPeriodEndDate}
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
          onPress={() => addPeriod()}
          accessibilityLabel="Zatwierdź daty"
          accessibilityRole="button"
          accessible={true}
        >
          <Text style={styles.buttonText}>Zatwierdź</Text>
        </Pressable>
      </View>

      {periods.length > 0 && (
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

      <Cards periods={periods} deletePeriod={deletePeriod} />
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
