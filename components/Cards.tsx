import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { backgroundColor, textColor } from '../utils/styles'
import Feather from '@expo/vector-icons/Feather'
import { periodType } from '../utils/types'

export default function Cards({
  periods,
  deletePeriod,
}: {
  periods: periodType[]
  deletePeriod: (i: number, d: number) => void
}) {
  return (
    <View style={styles.periodsContainer}>
      {periods.map((period, index) => {
        return (
          <View
            key={period.start}
            style={styles.periodCard}
            accessible={true}
            accessibilityLabel={`Okres pobytu od ${period.start} do ${period.end}. Liczba dni: ${period.duration}.`}
          >
            <View style={styles.periodContent}>
              <Text
                style={styles.periodRange}
              >{`${period.start} - ${period.end}`}</Text>
              <Text
                style={styles.periodDuration}
              >{`Liczba dni: ${period.duration}`}</Text>
            </View>
            <Feather
              name="trash-2"
              size={24}
              color="red"
              style={styles.trashIcon}
              onPress={() => {
                deletePeriod(index, period.duration)
              }}
              accessibilityLabel={`Usuń okres pobytu od ${period.start} do ${period.end}`}
              accessibilityRole="button"
              accessible={true}
            />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  periodsContainer: {
    width: '100%',
  },
  periodCard: {
    backgroundColor: backgroundColor,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    marginTop: 20,
  },
  periodContent: {
    justifyContent: 'center',
    width: '85%',
    padding: 20,
  },
  periodRange: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: textColor,
  },
  periodDuration: {
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
