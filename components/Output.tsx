import { View, Text } from 'react-native'
import React from 'react'
import { primary, textColor } from '../utils/styles'
import { isValidDate } from '../utils/validateDate'

export default function Output({
  okresZakazu,
  dniPobytu,
  startDate, //data rozpoczęcia zakazu
}: {
  okresZakazu: number
  dniPobytu: number
  startDate: string
}) {
  // Funkcja obliczająca końcową datę po dodaniu dniPobytu i okresZakazu do startDate
  function calculateDate(): string {
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
    if (!isValidDate(startDate)) return ''
    return `${newDay}/${newMonth}/${newYear}`
  }

  let calculatedDate = calculateDate()

  return (
    <View>
      {calculatedDate && (
        <Text style={{ fontSize: 17, opacity: 0.7, color: textColor }}>
          Przewidywana data końca zakazu:
        </Text>
      )}
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 10,
          color: primary,
        }}
      >
        {calculatedDate}
      </Text>
    </View>
  )
}
