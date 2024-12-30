import { renderHook, act } from '@testing-library/react-hooks'
import useDateInputHandler from '../utils/useDateInputHandler'
import { isValidDate } from '../utils/isValidDate'
import { Alert } from 'react-native'

// Mock Alert to verify if it was called
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}))

// Mock isValidDate function to control its output
jest.mock('../utils/isValidDate', () => ({
  isValidDate: jest.fn(),
}))

describe('useDate hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should handle valid date input correctly', () => {
    // Mock that the date is valid
    ;(isValidDate as jest.Mock).mockReturnValue(true)

    const { result } = renderHook(() => useDateInputHandler())

    // Initial state
    expect(result.current[0]).toBe('')
    expect(result.current[1]).toBe(true)

    // Simulate date change
    act(() => {
      result.current[2]('12/12/2024')
    })

    // Verify that the date was updated
    expect(result.current[0]).toBe('12/12/2024')
    expect(result.current[1]).toBe(true) // Date is valid

    // Verify that Alert was not called
    expect(Alert.alert).not.toHaveBeenCalled()
  })

  test('should handle invalid date input correctly', () => {
    // Mock that the date is invalid
    ;(isValidDate as jest.Mock).mockReturnValue(false)

    const { result } = renderHook(() => useDateInputHandler())

    act(() => {
      result.current[2]('31/02/2024') // Invalid date
    })

    // Verify that the date was updated
    expect(result.current[0]).toBe('31/02/2024')
    expect(result.current[1]).toBe(false) // Date is invalid

    // Verify that Alert was called
    expect(Alert.alert).toHaveBeenCalledWith(
      'Nieprawidłowa data',
      'Proszę wpisać istniejącą datę.'
    )
  })

  test('should handle empty input correctly', () => {
    const { result } = renderHook(() => useDateInputHandler())

    act(() => {
      result.current[2]('') // Empty date
    })

    // Verify that the date was updated
    expect(result.current[0]).toBe('')
    expect(result.current[1]).toBe(true) // Default to considering date as valid

    // Verify that Alert was not called
    expect(Alert.alert).not.toHaveBeenCalled()
  })

  test('should trigger Alert only when date length is 10 characters', () => {
    // Mock that the date is invalid
    ;(isValidDate as jest.Mock).mockReturnValue(false)

    const { result } = renderHook(() => useDateInputHandler())

    // Change date with an invalid length
    act(() => {
      result.current[2]('12/12') // Too short
    })

    // Verify that Alert was not called
    expect(Alert.alert).not.toHaveBeenCalled()

    // Change date to valid length but invalid date
    act(() => {
      result.current[2]('12/12/2024') // Valid length, but invalid date
    })

    // Verify that Alert was called
    expect(Alert.alert).toHaveBeenCalledWith(
      'Nieprawidłowa data',
      'Proszę wpisać istniejącą datę.'
    )
  })
})
