import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const NumberInput = () => {
  const [number, setNumber] = useState('');

  return (
    <View style={styles.container}>
      <Text>Wpisz okres zakazu w latach:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric" // Klawiatura z cyframi
        value={number}
        onChangeText={(text) => setNumber(text.replace(/[^0-9]/g, ''))} // Usuwa wszystko, co nie jest cyfrą
        placeholder="np. 10"
        maxLength={10} // Ograniczenie długości (opcjonalne)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    minWidth: 200,
  },
});

export default NumberInput;
