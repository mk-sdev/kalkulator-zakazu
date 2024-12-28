import Feather from '@expo/vector-icons/Feather'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import DateInputMask from './DateInputMask'

export default function OkresPobytu({
  setDniPobytu,
}: {
  setDniPobytu: (e: number) => void
}) {
  type okresType = {
    start: string
    end: string
    duration: number
  }

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [okresyPobytu, setOkresyPobytu] = useState<okresType[]>([])

  function countDays(): void {
    if (!startDate || !endDate) {
      Alert.alert('Błąd', 'Proszę uzupełnić obie daty.')
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
    } catch (error) {
      alert('Wystąpił błąd podczas obliczania różnicy dat.')
      console.error(error)
    }
  }

  function usunOkresPobytu(index: number, duration: number): void {
    setOkresyPobytu(prev => prev.filter((_, i) => i !== index))
    setDniPobytu((prev: number) => prev + duration)
  }

  useEffect(() => {
    let lacznyOkres: number = 0
    okresyPobytu.forEach(okres => (lacznyOkres += okres.duration))
    setDniPobytu(lacznyOkres)
  }, [okresyPobytu])

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Okres pobytu w zakładzie:</Text>
        <View style={styles.dateInputRow}>
          <DateInputMask setDateState={setStartDate} label="początek" />
          <DateInputMask setDateState={setEndDate} label="koniec" />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={() => countDays()}
        >
          <Text style={styles.buttonText}>Dodaj okres pobytu</Text>
        </Pressable>
      </View>

      <View style={styles.okresyContainer}>
        {okresyPobytu.map((okres, index) => {
          return (
            <View key={index} style={styles.okresCard}>
              <View style={styles.okresContent}>
                <Text
                  style={styles.okresText}
                >{`${okres.start} - ${okres.end}`}</Text>
                <Text
                  style={styles.okresDuration}
                >{`Liczba dni: ${okres.duration}`}</Text>
              </View>
              <Feather
                name="trash-2"
                size={24}
                color="red"
                style={styles.trashIcon}
                onPress={() => {
                  usunOkresPobytu(index, okres.duration)
                }}
              />
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
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
    fontSize: 19,
  },
  dateInputRow: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    elevation: 1,
  },
  buttonPressed: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#f0f0fa',
    fontSize: 16,
    fontWeight: 'bold',
  },
  okresyContainer: {
    width: '100%',
  },
  okresCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    marginTop: 20,
  },
  okresContent: {
    justifyContent: 'center',
    width: '85%',
    padding: 20,
  },
  okresText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  okresDuration: {
    fontSize: 17,
    color: '#555',
  },
  trashIcon: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 0, 0, .1)',
    borderRadius: 50,
    padding: 7,
    right: 10,
  },
})
