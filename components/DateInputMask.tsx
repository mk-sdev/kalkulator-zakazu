import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import useDate from '../hooks/useDate'
import { inputLabelStyle } from '../utils/styles'

const DateInputMask = ({
  setDateState,
  label
}: {
  setDateState: (e: unknown) => void,
  label: string
}) => {
  const [date, isValid, handleDateChange] = useDate()

  useEffect(() => {
    setDateState(date)
  }, [date])

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Text style={inputLabelStyle}>{label}:</Text>
      <TextInputMask
        type={'datetime'}
        placeholder="DD/MM/RRRR"
        options={{
          format: 'DD/MM/YYYY',
        }}
        value={date}
        onChangeText={handleDateChange}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
          borderRadius: 5,
          borderColor: isValid ? 'gray' : 'red', // Kolor ramki w zależności od poprawności daty
        }}
      />
    </View>
  )
}

export default DateInputMask
