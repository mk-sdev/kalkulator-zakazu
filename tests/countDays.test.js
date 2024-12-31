import { countDays } from '../utils/countDays'

describe('countDays', () => {
  test('should return 365', () => {
    expect(countDays('01/01/2022', '01/01/2023')).toBe(365)
  })

  test('should return 29', () => {
    expect(countDays('01/02/2024', '01/03/2024')).toBe(29)
  })
})
