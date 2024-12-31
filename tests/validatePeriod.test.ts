import { validatePeriod } from '../utils/validatePeriod'

// jest.mock('react-native', () => ({
//   Alert: {
//     alert: jest.fn(),
//   },
// }))

describe('validateOkresPobytu', () => {
  it("should return -1 if a date doesn't exist", () => {
    expect(validatePeriod('', '', '')).toBe(-1)
    expect(validatePeriod('22/12/2022', '', '')).toBe(-1)
    expect(validatePeriod('', '01/01/2001', '')).toBe(-1)
    expect(validatePeriod('', '01/01/2001', '01/01/2001')).toBe(-1)
  })

  it('should return -2 if a period date is invalid', () => {
    expect(validatePeriod('00/01/2001', '01/01/2001', '')).toBe(-2)
    expect(validatePeriod('22/12/2022', '01/22/2000', '01/01/2001')).toBe(-2)
    expect(validatePeriod('22/12/2022', '31/02/2001', '01/01/2001')).toBe(-2)
    expect(validatePeriod('22', '31/02/2001', '01/01/2001')).toBe(-2)
  })

  it('should return -3 if startDate is earlier than startZakazu', () => {
    expect(validatePeriod('01/01/2000', '02/01/2000', '01/01/2001')).toBe(-3)
  })

  it('should return -4 if startDate is not earlier than endDate', () => {
    expect(validatePeriod('02/01/2001', '01/01/2001', '01/01/2000')).toBe(-4)
    expect(validatePeriod('01/01/2001', '01/01/2001', '01/01/2000')).toBe(-4)
  })

  it('should return 1 if the dates are valid and in correct order', () => {
    expect(validatePeriod('02/01/2002', '10/01/2002', '01/01/2000')).toBe(1)
    expect(validatePeriod('01/01/2000', '02/01/2000', '01/01/2000')).toBe(1)
    // if banStartDate is an invalid date, then don't care about it
    expect(validatePeriod('01/01/2000', '02/01/2000', '01/21/2000')).toBe(1)
    expect(validatePeriod('01/01/2000', '02/01/2000', '01/')).toBe(1)
  })
})
