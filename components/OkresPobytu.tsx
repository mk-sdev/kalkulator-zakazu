import { View, Text, StyleSheet, Button, ScrollView } from 'react-native'
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

      // Resetowanie inputów
      //setStartDate('')
      //setEndDate('')
    } catch (error) {
      alert('Wystąpił błąd podczas obliczania różnicy dat.')
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'space-between' , height: 200}}>
        <DateInputMask
          setDateState={setStartDate}
          label="rozpoczęcie pobytu w zakładzie"
        />
        <DateInputMask
          setDateState={setEndDate}
          label="zakończenie pobytu w zakładzie"
        />
        <Button title="Dodaj okres pobytu" onPress={() => countDays()} />
      </View>

      {/* Wyświetlanie okresów pobytu z lepszą stylizacją */}
      <ScrollView contentContainerStyle={styles.okresyContainer}>
        {okresyPobytu.map((okres, index) => {
          return (
            <View key={index} style={styles.okresCard}>
              <Text
                style={styles.okresText}
              >{`Okres: ${okres.start} - ${okres.end}`}</Text>
              <Text
                style={styles.okresDuration}
              >{`Liczba dni: ${okres.duration}`}</Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0', // Tło kontenera
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  okresyContainer: {
    marginTop: 20, // Odstęp między przyciskiem a listą okresów
    width: '100%',
  },
  okresCard: {
    backgroundColor: '#ffffff', // Białe tło dla każdego okresu
    padding: 15,
    marginVertical: 10, // Odstęp między okresami
    borderRadius: 8, // Zaokrąglone rogi
    shadowColor: '#000', // Cień dla lepszego efektu
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Cień w Androidzie
  },
  okresText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Odstęp między start i end a dniami
  },
  okresDuration: {
    fontSize: 14,
    color: '#555', // Szary kolor dla liczby dni
  },
})
