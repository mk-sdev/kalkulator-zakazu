import { countDays } from '../utils/countDays'

describe('countDays', () => {
  test('should return 365', () => {
    expect(countDays('01/01/2022', '01/01/2023')).toBe(365)
  })

  test('should return 29', () => {
    expect(countDays('01/02/2024', '01/03/2024')).toBe(29)
  })

  test('should return 730', () => {
    expect(countDays('01/01/2022', '01/01/2024')).toBe(730)
  })

  test('should return 1096', () => {
    expect(countDays('28/01/2019', '28/01/2022')).toBe(1096)
  })

  test('should return 1881', () => {
    expect(countDays('28/01/2019', '23/03/2024')).toBe(1881)
  })

})
