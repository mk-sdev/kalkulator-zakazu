import React from 'react'
import { render, screen } from '@testing-library/react-native'
import Output from '../components/Output'

describe('Output Component', () => {
  it('should return an empty string if startDate is an empty string', () => {
    render(<Output banStartDate="" daysInPrison={5} banPeriod={1} />)

    expect(
      screen.queryByText('Przewidywana data końca zakazu:')
    ).not.toBeTruthy()
    expect(screen.queryByText('')).toBeTruthy() 
  })

  it('should return an empty string if startDate is too short', () => {
    render(<Output banStartDate="1" daysInPrison={5} banPeriod={1} />)

    expect(
      screen.queryByText('Przewidywana data końca zakazu:')
    ).not.toBeTruthy()
    expect(screen.queryByText('')).toBeTruthy() 
  })

  it('should return an empty string if startDate is invalid', () => {
    render(
      <Output banStartDate="31/02/2023" daysInPrison={365} banPeriod={1} />
    )

    expect(
      screen.queryByText('Przewidywana data końca zakazu:')
    ).not.toBeTruthy()
    expect(screen.queryByText('')).toBeTruthy()
  })

  it('should display the calculated date correctly', () => {
    render(<Output banStartDate="01/01/2023" daysInPrison={10} banPeriod={1} />)

    // 01/01/2023 + 1 year + 10 days
    expect(screen.getByText('Przewidywana data końca zakazu:')).toBeTruthy()
    expect(screen.getByText('11/01/2024')).toBeTruthy() 
  })

  it('should correctly add days and years to startDate', () => {
    render(<Output banStartDate="01/01/2023" daysInPrison={365} banPeriod={2} />)

    expect(screen.getByText('Przewidywana data końca zakazu:')).toBeTruthy()
    expect(screen.getByText('01/01/2026')).toBeTruthy() 
  })
})
