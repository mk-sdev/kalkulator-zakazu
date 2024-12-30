import React from 'react'
import { render, screen } from '@testing-library/react-native'
import Output from '../components/Output'

describe('Output Component', () => {
  it('should return an empty string if startDate is an empty string', () => {
    render(<Output startDate="" dniPobytu={5} okresZakazu={1} />)

    // Jeśli data jest niepoprawna, komponent powinien wyświetlić pustą datę
    expect(
      screen.queryByText('Przewidywana data końca zakazu:')
    ).not.toBeTruthy()
    expect(screen.queryByText('')).toBeTruthy() // Jeżeli zwróci pusty ciąg
  })

  it('should return an empty string if startDate is too short', () => {
    render(<Output startDate="1" dniPobytu={5} okresZakazu={1} />)

    // Jeśli data jest niepoprawna, komponent powinien wyświetlić pustą datę
    expect(
      screen.queryByText('Przewidywana data końca zakazu:')
    ).not.toBeTruthy()
    expect(screen.queryByText('')).toBeTruthy() // Jeżeli zwróci pusty ciąg
  })

  it('should return an empty string if startDate is invalid', () => {
    render(<Output startDate="31/02/2023" dniPobytu={365} okresZakazu={1} />)

    // Sprawdzamy, czy data jest pustym ciągiem w przypadku niepoprawnej daty
    expect(
      screen.queryByText('Przewidywana data końca zakazu:')
    ).not.toBeTruthy()
    expect(screen.queryByText('')).toBeTruthy()
  })

  it('should display the calculated date correctly', () => {
    render(<Output startDate="01/01/2023" dniPobytu={1} okresZakazu={1} />)

    // Sprawdzamy, czy data jest poprawnie obliczona (365 dni + 1 rok)
    expect(screen.getByText('Przewidywana data końca zakazu:')).toBeTruthy()
    expect(screen.getByText('02/01/2024')).toBeTruthy() // Przewidywana data końca zakazu (po dodaniu 1 roku)
  })

  it('should correctly add days and years to startDate', () => {
    render(<Output startDate="01/01/2023" dniPobytu={365} okresZakazu={2} />)

    // Sprawdzamy, czy data została obliczona po dodaniu 365 dni i 2 lata
    expect(screen.getByText('Przewidywana data końca zakazu:')).toBeTruthy()
    expect(screen.getByText('01/01/2026')).toBeTruthy() // Po dodaniu 2 lat do daty początkowej
  })
})
