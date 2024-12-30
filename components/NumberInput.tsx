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
          { borderWidth: isFocused ? 1.5 : 1 },
          styles.input,
        ]}
        keyboardType="numeric"
        value={number}
        onChangeText={text => {
          const sanitizedText = text.replace(/[^0-9]/g, '') // deletes non-numeric characters
          const withoutLeadingZeros = sanitizedText.replace(/^0+/, '') // deletes leading zeros
          setNumber(withoutLeadingZeros) 
        }}
        placeholder="np. 10"
        maxLength={2}
        placeholderTextColor={inputColor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        accessibilityLabel="Okres zakazu w latach"
        accessibilityHint="Wprowadź liczbę lat trwania okresu zakazu. Wartość musi być pomiędzy 0 a 99. Pole nie jest obowiązkowe."
        accessible={true}
        accessibilityValue={{
          min: 0,
          max: 99,
          now: number ? parseInt(number, 10) : undefined, // Jeśli podano wartość, przekazuje jej aktualną liczbę
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  input: {
    padding: 10,
    marginTop: 10,
    borderRadius: inputRadius,
    minWidth: 200,
    color: textColor,
  },
})

export default NumberInput
