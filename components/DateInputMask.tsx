import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import useDate from '../hooks/useDate'

const DateInputMask = ({
  setDateState,
}: {
  setDateState: (e: unknown) => void
}) => {
  const [date, isValid, handleDateChange] = useDate()

  useEffect(() => {
    setDateState(date)
  }, [date])

  return (
    <View style={{ padding: 20 }}>
      <Text>Wpisz datę rozpoczęcia zakazu:</Text>
      <TextInputMask
        type={'datetime'}
        placeholder="DD/MM/RRRR"
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
