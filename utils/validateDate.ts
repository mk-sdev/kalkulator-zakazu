export const isValidDate = (input: string): boolean => {
  const [day, month, year] = input.split('/').map(Number)

  // Sprawdzenie, czy data jest poprawna
  const isValid =
    year >= 1900 &&
    year <= 2100 && // Rok w dopuszczalnym zakresie
    month >= 1 &&
    month <= 12 && // Miesiąc między 1 a 12
    day >= 1 &&
    day <= new Date(year, month, 0).getDate() // Dzień w zakresie dni miesiąca

  return isValid
}
