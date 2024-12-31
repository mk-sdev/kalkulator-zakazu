
  export function countDays(periodStartDate: string, periodEndDate: string): number{
      const [startDay, startMonth, startYear] = periodStartDate
        .split('/')
        .map(Number)
      const [endDay, endMonth, endYear] = periodEndDate.split('/').map(Number)

      const start = new Date(startYear, startMonth - 1, startDay)
      const end = new Date(endYear, endMonth - 1, endDay)

      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
  }