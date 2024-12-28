import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import useDate from '../hooks/useDate'
import {
  backgroundColor,
  inputColor,
  inputLabelStyle,
  inputRadius,
  primary,
  textColor,
} from '../utils/styles'

const DateInputMask = ({
  setDateState,
  label,
  resetTrigger,
}: {
  setDateState: (e: unknown) => void
  label: string
  resetTrigger: boolean
}) => {
  const [date, isValid, handleDateChange] = useDate()
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setDateState(date)
  }, [date])

  // Resetujemy stan daty, gdy resetTrigger się zmienia
  useEffect(() => {
    if (resetTrigger) {
      handleDateChange('')
    }
  }, [resetTrigger])

  function returnBorderColor() {
    if (!isValid) return 'red'
    if (isFocused) return primary
    return inputColor
  }

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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={inputColor}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
          borderRadius: inputRadius,
          borderColor: returnBorderColor(),
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      />
    </View>
  )
}

export default DateInputMask
