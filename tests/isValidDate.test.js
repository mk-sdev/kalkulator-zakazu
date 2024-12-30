import { isValidDate } from '../utils/isValidDate'

describe('isValidDate', () => {
  test('returns true for valid dates', () => {
    expect(isValidDate('01/01/2023')).toBe(true) // Valid date
    expect(isValidDate('29/02/2020')).toBe(true) // Leap year
    expect(isValidDate('31/12/2099')).toBe(true) // Edge valid date
  })

  test('returns false for invalid day', () => {
    expect(isValidDate('32/01/2023')).toBe(false) // Invalid day
    expect(isValidDate('00/12/2023')).toBe(false) // Invalid day
  })

  test('returns false for invalid month', () => {
    expect(isValidDate('15/13/2023')).toBe(false) // Invalid month
    expect(isValidDate('15/00/2023')).toBe(false) // Invalid month
  })

  test('returns false for invalid year', () => {
    expect(isValidDate('15/01/1899')).toBe(false) // Year too low
    expect(isValidDate('15/01/2101')).toBe(false) // Year too high
  })

  test('returns false for invalid formats', () => {
    expect(isValidDate('2023/01/01')).toBe(false) // Incorrect format
    expect(isValidDate('01-01-2023')).toBe(false) // Incorrect separator
    expect(isValidDate('')).toBe(false) // Empty string
  })
})
