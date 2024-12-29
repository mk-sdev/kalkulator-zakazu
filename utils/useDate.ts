import React, { useState } from 'react'
import { Alert } from 'react-native'
import { isValidDate } from './validateDate'

export default function useDate(): [string, boolean, (text: string) => void] {
  const [date, setDate] = useState('')
  const [isValid, setIsValid] = useState(true)

  const handleDateChange = (text: string): void => {
    setDate(text)

    // Walidacja daty
    if (text.length === 10) {
      // Walidujemy dopiero, gdy długość daty jest odpowiednia
      const isValid: boolean = isValidDate(text)
      setIsValid(isValid)

      if (!isValid) {
        Alert.alert('Nieprawidłowa data', 'Proszę wpisać istniejącą datę.')
      }
    } else {
      setIsValid(true) // Domyślnie uznajemy datę za poprawną, jeśli długość nie pasuje
    }
  }

  return [date, isValid, handleDateChange] // Explicitly returning handleDateChange as a callable function
}
