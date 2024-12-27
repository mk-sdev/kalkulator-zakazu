import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import DateInputMask from './DateInputMask'

export default function OkresPobytu({
  setDniPobytu,
}: {
  setDniPobytu: (e: number) => void
}) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [okresyPobytu, setOkresyPobytu] = useState([])

  // Oblicza różnicę między startDate a endDate
  function countDays(): void {
    if (!startDate || !endDate) {
      alert('Proszę uzupełnić obie daty.')
      return
    }

    try {
      const [startDay, startMonth, startYear] = startDate.split('/').map(Number)
      const [endDay, endMonth, endYear] = endDate.split('/').map(Number)

      const start = new Date(startYear, startMonth - 1, startDay) // Miesiące w obiekcie Date są 0-indeksowane
      const end = new Date(endYear, endMonth - 1, endDay)

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        alert('Proszę podać poprawne daty.')
        return
      }

      if (start > end) {
        alert('Data końcowa nie może być wcześniejsza niż początkowa.')
        return
      }

      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // Konwersja milisekund na dni

      setDniPobytu((prev: number) => prev + diffDays) // Ustawienie liczby dni w stanie nadrzędnym
      setOkresyPobytu([
        ...okresyPobytu,
        { start: startDate, end: endDate, duration: diffDays },
      ])

      // FIXME: Resetowanie inputów nie działa
      setStartDate('')
      setEndDate('')
    } catch (error) {
      alert('Wystąpił błąd podczas obliczania różnicy dat.')
      console.error(error)
    }
  }

  return (
    <View style={{ backgroundColor: 'pink' }}>
      <DateInputMask setDateState={setStartDate} />
      <DateInputMask setDateState={setEndDate} />
      <Button title="Dodaj" onPress={() => countDays()} />
      {okresyPobytu.map((okres, index) => {
        return (
          <Text
            key={index}
          >{`Okres: ${okres.start} - ${okres.end}, liczba dni: ${okres.duration}`}</Text>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({})
