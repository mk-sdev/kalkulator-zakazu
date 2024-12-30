import { Alert } from 'react-native'
import { isValidDate } from './validateDate'
import { datesInOrder } from './datesInOrder'

/**
 * Sprawdza, czy można dodać okres pobytu
 *
 * @param {string} startDate - data rozpoczęcia pobytu.
 * @param {string} endDate - data zakończenia pobytu.
 * @param {string} startZakazu - data rozpoczęcia zakazu.
 * @returns {1 | -1 | -2 | -3 | -4}
 */
export function validateOkresPobytu(
  startDate: string,
  endDate: string,
  startZakazu: string
): number {
  if (!startDate || !endDate) {
    Alert.alert('Błąd', 'Proszę uzupełnić obie daty.')
    return -1
  }

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    Alert.alert('Błąd', 'Proszę podać poprawne daty.')
    return -2
  }

  if (datesInOrder(startZakazu, startDate) === -1) {
    Alert.alert(
      'Błąd',
      'Okres pobytu powinien zacząć się po rozpoczęciu zakazu.'
    )
    return -3
  }
  if (datesInOrder(startDate, endDate) < 1) {
    Alert.alert('Błąd', 'Data początkowa musi być wcześniejsza niż końcowa.')
    return -4
  }
  return 1 // OK
}
