import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import {
  inputColor,
  inputLabelStyle,
  inputRadius,
  primary,
  textColor,
} from '../utils/styles'

const NumberInput = ({
  setOkresZakazu,
}: {
  setOkresZakazu: (e: number) => void
}) => {
  const [number, setNumber] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setOkresZakazu(parseInt(number, 10))
  }, [number])

  return (
    <View style={styles.container}>
      <Text style={inputLabelStyle}>okres zakazu w latach:</Text>
      <TextInput
        style={[
          { borderColor: isFocused ? primary : inputColor },
          styles.input,
        ]}
        keyboardType="numeric"
        value={number}
        onChangeText={text => setNumber(text.replace(/[^0-9]/g, ''))} // Usuwa wszystko, co nie jest cyfrą
        placeholder="np. 10"
        maxLength={10}
        placeholderTextColor={inputColor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: inputRadius,
    minWidth: 200,
    color: textColor
  },
})

export default NumberInput
