import { View, Text } from 'react-native'
import React from 'react'
import { primary, textColor } from '../utils/styles'
import { isValidDate } from '../utils/isValidDate'

export default function Output({
  banStartDate, 
  banPeriod,
  daysInPrison,
}: {
  banStartDate: string
  banPeriod: number
  daysInPrison: number
}) {

  // Calculates the end date after adding all days spent in prison and the years of ban
  function calculateDate(): string {
    // Convert banStartDate to Date object
    const [banStartDay, banStartMonth, banStartYear] = banStartDate
      .split('/')
      .map(Number)
    const startDate = new Date(banStartYear, banStartMonth - 1, banStartDay)

    // Add daysInPrison
    startDate.setDate(startDate.getDate() + daysInPrison)

    // Add banPeriod (years)
    startDate.setFullYear(startDate.getFullYear() + banPeriod)

    // Formatting to DD/MM/YYYY
    const newDay = String(startDate.getDate()).padStart(2, '0')
    const newMonth = String(startDate.getMonth() + 1).padStart(2, '0')
    const newYear = startDate.getFullYear()

    if (newDay === 'NaN' || newMonth === 'NaN' || Number.isNaN(newYear))
      return ''
    if (!isValidDate(banStartDate)) return ''
    return `${newDay}/${newMonth}/${newYear}`
  }

  let calculatedDate = calculateDate()

  return (
    <View>
      {calculatedDate && (
        <Text
          style={{ fontSize: 17, opacity: 0.7, color: textColor }}
          accessibilityLabel="Przewidywana data końca zakazu"
          accessibilityRole="text"
          accessible={true}
        >
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
        accessibilityLabel={`Data końca zakazu to ${calculatedDate}`}
        accessibilityRole="text"
        accessible={true}
      >
        {calculatedDate}
      </Text>
    </View>
  )
}
