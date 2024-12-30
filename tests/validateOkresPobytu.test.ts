import { validateOkresPobytu } from '../utils/validateOkresPobytu'

// jest.mock('react-native', () => ({
//   Alert: {
//     alert: jest.fn(),
//   },
// }))

describe('validateOkresPobytu', () => {
  it("should return -1 if a date doesn't exist", () => {
    expect(validateOkresPobytu('', '', '')).toBe(-1)
    expect(validateOkresPobytu('22/12/2022', '', '')).toBe(-1)
    expect(validateOkresPobytu('', '01/01/2001', '')).toBe(-1)
    expect(validateOkresPobytu('', '01/01/2001', '01/01/2001')).toBe(-1)
  })

  it('should return -2 if a period date is invalid', () => {
    expect(validateOkresPobytu('00/01/2001', '01/01/2001', '')).toBe(-2)
    expect(validateOkresPobytu('22/12/2022', '01/22/2000', '01/01/2001')).toBe(
      -2
    )
    expect(validateOkresPobytu('22/12/2022', '31/02/2001', '01/01/2001')).toBe(
      -2
    )
    expect(validateOkresPobytu('22', '31/02/2001', '01/01/2001')).toBe(-2)
  })

  it('should return -3 if startDate is earlier than startZakazu', () => {
    expect(validateOkresPobytu('01/01/2000', '02/01/2000', '01/01/2001')).toBe(
      -3
    )
  })

  it('should return -4 if startDate is not earlier than endDate', () => {
    expect(validateOkresPobytu('02/01/2001', '01/01/2001', '01/01/2000')).toBe(
      -4
    )
    expect(validateOkresPobytu('01/01/2001', '01/01/2001', '01/01/2000')).toBe(
      -4
    )
  })

  it('should return 1 if the dates are valid and in correct order', () => {
    expect(validateOkresPobytu('02/01/2002', '10/01/2002', '01/01/2000')).toBe(
      1
    )
    expect(validateOkresPobytu('01/01/2000', '02/01/2000', '01/01/2000')).toBe(
      1
    )
  })
})
