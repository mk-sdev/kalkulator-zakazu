export const isValidDate = (input: string): boolean => {
  const [day, month, year] = input.split('/').map(Number)

  const isValid =
    year >= 1900 &&
    year <= 2100 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= new Date(year, month, 0).getDate() // Day in the range of days of the month

  return isValid
}
