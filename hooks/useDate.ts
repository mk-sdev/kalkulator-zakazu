import React, { useState } from 'react'
import { Alert } from 'react-native'

export default function useDate() {
    const [date, setDate] = useState('')
    const [isValid, setIsValid] = useState(true)

    const validateDate = (input: string) => {
      const [day, month, year] = input.split('/').map(Number)

      // Sprawdzenie, czy data jest poprawna
      const isValidDate =
        year >= 1900 &&
        year <= 2100 && // Rok w dopuszczalnym zakresie
        month >= 1 &&
        month <= 12 && // Miesiąc między 1 a 12
        day >= 1 &&
        day <= new Date(year, month, 0).getDate() // Dzień w zakresie dni miesiąca

      return isValidDate
    }

    const handleDateChange = (text: string) => {
      setDate(text)

      // Walidacja daty
      if (text.length === 10) {
        // Walidujemy dopiero, gdy długość daty jest odpowiednia
        const isValidDate = validateDate(text)
        setIsValid(isValidDate)

        if (!isValidDate) {
          Alert.alert('Nieprawidłowa data', 'Proszę wpisać istniejącą datę.')
        }
      } else {
        setIsValid(true) // Domyślnie uznajemy datę za poprawną, jeśli długość nie pasuje
      }
    }

    return [date, isValid, handleDateChange]
}