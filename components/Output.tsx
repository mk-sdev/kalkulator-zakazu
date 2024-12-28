import { View, Text } from 'react-native'
import React from 'react'

export default function Output({
  okresZakazu,
  dniPobytu,
  startDate,
}: {
  okresZakazu: number
  dniPobytu: number
  startDate: string
}) {
  // Funkcja zwracająca datę po dodaniu dniPobytu i okresZakazu do startDate
  function returnDate(): string {
    // Konwersja startDate na obiekt Date
    const [startDay, startMonth, startYear] = startDate.split('/').map(Number)
    const start = new Date(startYear, startMonth - 1, startDay)

    // Dodanie dniPobytu do daty
    start.setDate(start.getDate() + dniPobytu)

    // Dodanie okresZakazu w latach
    start.setFullYear(start.getFullYear() + okresZakazu)

    // Formatowanie daty na DD/MM/YYYY
    const newDay = String(start.getDate()).padStart(2, '0')
    const newMonth = String(start.getMonth() + 1).padStart(2, '0')
    const newYear = start.getFullYear()

    if (newDay === 'NaN' || newMonth === 'NaN' || Number.isNaN(newYear))
      return ''
    return `${newDay}/${newMonth}/${newYear}`
  }

  return (
    <View>
      <Text style={{ fontSize: 17, opacity: 0.7 }}>
        Przewidywana data końca zakazu:
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        {returnDate()}
      </Text>
    </View>
  )
}
