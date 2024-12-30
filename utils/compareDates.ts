/**
 * Compares two dates represented as strings in the format "DD/MM/YYYY".
 * Returns a comparison result indicating the order of the dates.
 *
 * @param {string} date1 - The first date in "DD/MM/YYYY" format.
 * @param {string} date2 - The second date in "DD/MM/YYYY" format.
 * @returns {-1 | 0 | 1}
 *   - Returns `1` if `date1` is earlier than `date2`.
 *   - Returns `-1` if `date1` is later than `date2`.
 *   - Returns `0` if `date1` and `date2` are equal.
 *
 * @example
 * datesInOrder("02/10/2002", "30/01/2004"); // Returns 1
 *
 * @example
 * datesInOrder("15/05/2020", "10/05/2020"); // Returns -1
 *
 * @example
 * datesInOrder("01/01/2023", "01/01/2023"); // Returns 0
 */
export function compareDates(date1: string, date2: string): -1 | 0 | 1 {
  const [day1, month1, year1] = date1.split('/').map(Number)
  const [day2, month2, year2] = date2.split('/').map(Number)

  const d1 = new Date(year1, month1 - 1, day1)
  const d2 = new Date(year2, month2 - 1, day2)

  if (d1 < d2) return 1
  else if (d1 > d2) return -1
  else return 0
}
