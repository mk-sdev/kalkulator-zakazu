import { Alert } from 'react-native'
import { isValidDate } from './isValidDate'
import { compareDates } from './compareDates'

/**
 * Checks if a period can be added to the list
 *
 * @param {string} periodStartDate - data rozpoczęcia pobytu
 * @param {string} periodEndDate - data zakończenia pobytu
 * @param {string} banStartDate - data rozpoczęcia zakazu
 * @returns {1 | -1 | -2 | -3 | -4}
 */
export function validatePeriod(
  periodStartDate: string,
  periodEndDate: string,
  banStartDate: string
): number {
  if (!periodStartDate || !periodEndDate) {
    Alert.alert('Błąd', 'Proszę uzupełnić obie daty.')
    return -1
  }

  if (!isValidDate(periodStartDate) || !isValidDate(periodEndDate)) {
    Alert.alert('Błąd', 'Proszę podać poprawne daty.')
    return -2
  }

  if (compareDates(banStartDate, periodStartDate) === -1 && isValidDate(banStartDate)) {
    Alert.alert(
      'Błąd',
      'Okres pobytu powinien zacząć się po rozpoczęciu zakazu.'
    )
    return -3
  }
  if (compareDates(periodStartDate, periodEndDate) < 1) {
    Alert.alert('Błąd', 'Data początkowa musi być wcześniejsza niż końcowa.')
    return -4
  }
  return 1 // OK
}
