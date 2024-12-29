import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { backgroundColor, textColor } from '../utils/styles'
import Feather from '@expo/vector-icons/Feather'
import { okresType } from '../utils/types'

export default function Cards({
  okresyPobytu,
  usunOkresPobytu,
}: {
  okresyPobytu: okresType[]
  usunOkresPobytu: (i: number, d: number) => void
}) {
  return (
    <View style={styles.okresyContainer}>
      {okresyPobytu.map((okres, index) => {
        return (
          <View key={okres.start} style={styles.okresCard}>
            <View style={styles.okresContent}>
              <Text
                style={styles.okresText}
              >{`${okres.start} - ${okres.end}`}</Text>
              <Text
                style={styles.okresDuration}
              >{`Liczba dni: ${okres.duration}`}</Text>
            </View>
            <Feather
              name="trash-2"
              size={24}
              color="red"
              style={styles.trashIcon}
              onPress={() => {
                usunOkresPobytu(index, okres.duration)
              }}
            />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  okresyContainer: {
    width: '100%',
  },
  okresCard: {
    backgroundColor: backgroundColor,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    marginTop: 20,
  },
  okresContent: {
    justifyContent: 'center',
    width: '85%',
    padding: 20,
  },
  okresText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: textColor,
  },
  okresDuration: {
    fontSize: 17,
    color: textColor,
    opacity: 0.7,
  },
  trashIcon: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 0, 0, .1)',
    borderRadius: 50,
    padding: 7,
    right: 10,
  },
})
