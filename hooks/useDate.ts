import React, { useState } from 'react'
import { Alert } from 'react-native'
import { validateDate } from '../utils/validateDate'

export default function useDate() {
    const [date, setDate] = useState('')
    const [isValid, setIsValid] = useState(true)


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