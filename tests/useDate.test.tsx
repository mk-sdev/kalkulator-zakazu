// useDate.test.tsx
import { renderHook, act } from '@testing-library/react-hooks'
import useDate from '../utils/useDate'
import { isValidDate } from '../utils/validateDate'
import { Alert } from 'react-native'

// Mockujemy Alert, żeby sprawdzić, czy zostało wywołane
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}))

// Mockujemy funkcję isValidDate, jeśli chcesz kontrolować jej wynik
jest.mock('../utils/validateDate', () => ({
  isValidDate: jest.fn(),
}))

describe('useDate hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should handle valid date input correctly', () => {
    // Mockujemy, że data jest poprawna
    ;(isValidDate as jest.Mock).mockReturnValue(true)

    const { result } = renderHook(() => useDate())

    // Początkowy stan
    expect(result.current[0]).toBe('')
    expect(result.current[1]).toBe(true)

    // Symulujemy zmianę daty
    act(() => {
      result.current[2]('12/12/2024')
    })

    // Sprawdzamy, czy data została zaktualizowana
    expect(result.current[0]).toBe('12/12/2024')
    expect(result.current[1]).toBe(true) // Data jest poprawna

    // Sprawdzamy, czy Alert nie został wywołany
    expect(Alert.alert).not.toHaveBeenCalled()
  })

  test('should handle invalid date input correctly', () => {
    // Mockujemy, że data jest niepoprawna
    ;(isValidDate as jest.Mock).mockReturnValue(false)

    const { result } = renderHook(() => useDate())

    act(() => {
      result.current[2]('31/02/2024') // Niepoprawna data
    })

    // Sprawdzamy, czy data została zaktualizowana
    expect(result.current[0]).toBe('31/02/2024')
    expect(result.current[1]).toBe(false) // Data jest niepoprawna

    // Sprawdzamy, czy Alert został wywołany
    expect(Alert.alert).toHaveBeenCalledWith(
      'Nieprawidłowa data',
      'Proszę wpisać istniejącą datę.'
    )
  })

  test('should handle empty input correctly', () => {
    const { result } = renderHook(() => useDate())

    act(() => {
      result.current[2]('') // Pusta data
    })

    // Sprawdzamy, czy data została zaktualizowana
    expect(result.current[0]).toBe('')
    expect(result.current[1]).toBe(true) // Domyślnie uznajemy datę za poprawną

    // Sprawdzamy, że Alert nie został wywołany
    expect(Alert.alert).not.toHaveBeenCalled()
  })

  test('should trigger Alert only when date length is 10 characters', () => {
    // Mockujemy, że data jest niepoprawna
    ;(isValidDate as jest.Mock).mockReturnValue(false)

    const { result } = renderHook(() => useDate())

    // Zmiana daty z nieprawidłową długością
    act(() => {
      result.current[2]('12/12') // Zbyt krótka data
    })

    // Sprawdzamy, że Alert nie został wywołany
    expect(Alert.alert).not.toHaveBeenCalled()

    // Zmiana daty na poprawną długość, ale z niepoprawną datą
    act(() => {
      result.current[2]('12/12/2024') // Poprawna długość, ale niepoprawna data
    })

    // Sprawdzamy, że Alert został wywołany
    expect(Alert.alert).toHaveBeenCalledWith(
      'Nieprawidłowa data',
      'Proszę wpisać istniejącą datę.'
    )
  })
})
