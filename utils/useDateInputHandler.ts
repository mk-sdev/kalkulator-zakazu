import { useState } from 'react'
import { Alert } from 'react-native'
import { isValidDate } from './isValidDate'

export default function useDateInputHandler(): [
  string,
  boolean,
  (text: string) => void
] {
  const [date, setDate] = useState('')
  const [isValid, setIsValid] = useState(true)

  const handleDateChange = (text: string): void => {
    setDate(text)

    if (text.length === 10) {
      // Validate inly if the length is proper
      const isValid: boolean = isValidDate(text)
      setIsValid(isValid)

      if (!isValid) {
        Alert.alert('Nieprawidłowa data', 'Proszę wpisać istniejącą datę.')
      }
    } else {
      setIsValid(true) // date is correct by default
    }
  }

  return [date, isValid, handleDateChange]
}
