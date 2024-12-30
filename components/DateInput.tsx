import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import useDate from '../utils/useDate'
import {
  backgroundColor,
  inputColor,
  inputLabelStyle,
  inputRadius,
  primary,
  textColor,
} from '../utils/styles'

interface DateInputMaskProps {
  setDateState: (e: string) => void
  label: string
  resetTrigger?: boolean
}

const DateInputMask = ({
  setDateState,
  label,
  resetTrigger,
}: DateInputMaskProps) => {
  const [date, isValid, handleDateChange] = useDate()
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setDateState(date)
  }, [date])

  useEffect(() => {
    handleDateChange('')
  }, [resetTrigger])

  function returnBorderColor() {
    if (isFocused) return primary
    if (!isValid || (!isFocused && date.length > 0 && date.length < 10)) return 'red'
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
        accessibilityLabel={label}
        accessibilityHint="Wprowadź datę w formacie DD/MM/RRRR."
        style={{
          padding: 10,
          marginTop: 10,
          borderRadius: inputRadius,
          borderColor: returnBorderColor(),
          backgroundColor: backgroundColor,
          color: textColor,
          borderWidth:
            isFocused || !isValid || (date.length > 0 && !isFocused) ? 1.5 : 1,
        }}
      />
    </View>
  )
}

export default DateInputMask
