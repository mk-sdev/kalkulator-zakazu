import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

const DateInputMask = () => {
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

  const handleDateChange = (text:string) => {
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

  return (
    <View style={{ padding: 20 }}>
      <Text>Wpisz datę:</Text>
      <TextInputMask
        type={'datetime'}
        placeholder="DD/MM/YYYY"
        options={{
          format: 'DD/MM/YYYY', // Format daty
        }}
        value={date}
        onChangeText={handleDateChange}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
          borderRadius: 5,
          borderColor: isValid ? 'gray' : 'red', // Kolor ramki w zależności od poprawności daty
          minWidth: 200,
        }}
      />
    </View>
  )
}

export default DateInputMask
