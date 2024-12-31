import { View, Text, StyleSheet, FlatList } from 'react-native'
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
  const card = ({ item, index }: { item: periodType; index: number }) => (
    <View
      style={styles.periodCard}
      accessible={true}
      accessibilityLabel={`Okres pobytu od ${item.start} do ${item.end}. Liczba dni: ${item.duration}.`}
    >
      <View style={styles.periodContent}>
        <Text style={styles.periodRange}>{`${item.start} - ${item.end}`}</Text>
        <Text
          style={styles.periodDuration}
        >{`Liczba dni: ${item.duration}`}</Text>
      </View>
      <Feather
        name="trash-2"
        size={24}
        color="red"
        style={styles.trashIcon}
        onPress={() => {
          deletePeriod(index, item.duration)
        }}
        accessibilityLabel={`Usuń okres pobytu od ${item.start} do ${item.end}`}
        accessibilityRole="button"
        accessible={true}
      />
    </View>
  )

  return (
    <FlatList
      data={periods}
      renderItem={card}
      keyExtractor={item => item.start}
      contentContainerStyle={styles.periodsContainer}
    />
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
